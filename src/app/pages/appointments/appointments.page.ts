import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { AppointmentCard } from 'src/app/common/models/appointment-card.model';
import { Appointment, AppointmentStatus } from 'src/app/common/models/appointment.model';
import { User } from 'src/app/common/models/user.model';

import { LoadingService } from 'src/app/common/services/loading/loading.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { UserService } from 'src/app/services/user/user.service';

import { ProductsAndServicesService } from 'src/app/services/products-and-services/products-and-services.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  bookingCategory;
  allAppointments: Appointment[] = new Array<Appointment>();
  user: User = new User();
  filteredOnGoingBookings: Appointment[] = new Array<Appointment>();
  filteredUpcomingBookings: Appointment[] = new Array<Appointment>();
  filteredPastBookings: Appointment[] = new Array<Appointment>();

  constructor(
    // private spSvc: ServicesProviderService,
    private router: Router,
    private appointmentSvc: AppointmentService,
    private userSvc: UserService,
    private loadingSvc: LoadingService,
    private productsAndServicesSvc: ProductsAndServicesService,
    private notificationService: NotificationService,
    private networkCheckService: NetworkCheckService
  ) { }

  ngOnInit() {
    this.bookingCategory = 'today';
  }

  ionViewDidEnter() {
    // this.getAllUserAppointments();
    // this.subscribeToBookingChanges();
    this.user = this.userSvc.userInformation();
    this.bookingCategory = 'today';
    this.getAllBookings();
  }

  getAllBookings() {
    if (this.networkCheckService.networkStatus()) {
      this.loadingSvc.show();
      this.appointmentSvc.getAllBookings(this.user.userId).subscribe((res: any) => {
        this.loadingSvc.close();
        this.appointmentSvc.storeAppointmentsToLocalStorage(res);
        this.allAppointments = res;
        this.filterBookings();
      }, (err: any) => {
        console.log(err);
        // alert(JSON.stringify(err));
        this.loadingSvc.close();
      });
    } else {
      this.appointmentSvc.getAppointmentsFromLocalStorage().subscribe((res: any) => {
        this.allAppointments = res;
        if (res) {
          this.filterBookings();
        }
      });
    }
  }

  refreshBookings(event) {
    if (this.networkCheckService.networkStatus()) {
      this.loadingSvc.show();
      this.appointmentSvc.getAllBookings(this.user.userId).subscribe((res: any) => {
        this.loadingSvc.close();
        this.allAppointments = res;
        this.filterBookings();
        event.target.complete();
      }, (err: any) => {
        console.log(err);
        // alert(JSON.stringify(err));
        this.loadingSvc.close();
      });
    } else {
      event.target.complete();
    }
  }


  bookingSegmentChanged(event: any) {
    // console.log(event);
    this.bookingCategory = event.detail.value;
  }

  appointmentDetails(appointment: Appointment) {
    if (this.networkCheckService.networkStatus()) { 
      const navigationExtras: NavigationExtras = {
          queryParams: {
            bookingIdParams: appointment.bookingId
          }
      };
      this.router.navigate(['appointments/details'], navigationExtras);
    } else {
      this.networkCheckService.showNetworkStatusError();
    }
}

  filterBookings() {
    this.loadingSvc.show();
    this.filteredOnGoingBookings = new Array<Appointment>();
    this.filteredUpcomingBookings = new Array<Appointment>();
    this.filteredPastBookings = new Array<Appointment>();
    const bookingsToUpdate = [];
    const bookingsToSaveAsLocalNotif = [];
    // iterate all bookings
    for (const booking of this.allAppointments) {
        const bookingDateTime: any = moment(booking.date + ' ' + booking.time, 'YYYY-MM-DD hh:mm A');
        booking.bookingDateTime = bookingDateTime.format('YYYY-MM-DD hh:mm A');

        booking.appointmentCard = new AppointmentCard();
        booking.appointmentCard.amount = booking.fees;
        booking.appointmentCard.bookingAddress = booking.address;
        booking.appointmentCard.clientName = booking.clientName;
        booking.appointmentCard.duration = booking.duration;
        booking.appointmentCard.bookingDate = bookingDateTime.format('MMM DD, YYYY/hh:mm A');
        booking.appointmentCard.serviceName = 'Men\'s Haircut';

        // Check if booking date time is future by adding 1 hour to booking date time
        if (moment().isBefore(moment(bookingDateTime).add(1, 'hour'))) {
          // If so check again if booking is on going if it's between booking start time and end time
          if (moment().isBetween(moment(bookingDateTime).subtract(1, 'hour'), moment(bookingDateTime).add(1, 'hour'))) {
            // Check again if 15 minutes and booking is still pending or reserved
            if (booking.status === AppointmentStatus.REJECTED || booking.status  === AppointmentStatus.COMPLETED ) {
              booking.isPast = true;
              this.filteredPastBookings.push(booking);
            } else {
              this.filteredOnGoingBookings.push(booking);
            }

          } else {
            this.filteredUpcomingBookings.push(booking);
            if (booking.status === AppointmentStatus.ACCEPTED) {
                const localNotif = {
                    id: Math.ceil(Math.random() * 100),
                    title: 'BOOKING ' + booking.referenceNo,
                    text: 'Hi ' + this.user.firstName + ', you have an appointment scheduled for today and it will be in the next hour.',
                    trigger: { at: new Date(moment(bookingDateTime).subtract(1, 'hour').format())},
                    data: { bookingId: booking.bookingId }
                };
                // console.log(moment(bookingDateTime).subtract(1, 'hour').format());
                // console.log(new Date(moment(bookingDateTime).subtract(1, 'hour').format()));
                bookingsToSaveAsLocalNotif.push(localNotif);
            }
          }
        } else { // Else booking is past
          // check status if pending or reserved. Change to rejected.
          booking.isPast = true;
          if (booking.status === AppointmentStatus.PENDING || booking.status === AppointmentStatus.RESERVED) {
            console.log('Status is still Pending or Reserved. We should reject status to free up this schedule');
            booking.status = AppointmentStatus.REJECTED;
            bookingsToUpdate.push(booking);
          }

          this.filteredPastBookings.push(booking);
        }
    }


    this.filteredOnGoingBookings.sort((a, b) => {
      return moment(a.bookingDateTime, 'YYYY-MM-DD hh:mm A').diff(b.bookingDateTime);
    });

    this.filteredUpcomingBookings.sort((a, b) => {
      return moment(a.bookingDateTime, 'YYYY-MM-DD hh:mm A').diff(b.bookingDateTime);
    });

    this.filteredPastBookings.sort((a, b) => {
      return moment(a.bookingDateTime, 'YYYY-MM-DD hh:mm A').diff(b.bookingDateTime);
    });

    this.filteredPastBookings.reverse();
    this.notificationService.saveFutureLocalNotifications(bookingsToSaveAsLocalNotif);

    // console.log(this.filteredUpcomingBookings);
    setTimeout(() => {
      this.loadingSvc.close();
    }, 100);
}

}
