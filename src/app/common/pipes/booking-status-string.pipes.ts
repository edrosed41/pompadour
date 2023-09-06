import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentStatusCode, AppointmentStatus } from '../models/appointment.model';

@Pipe({
    name: 'bookingstatusstring'
})

export class BookingStatusStringPipe implements PipeTransform {
    transform(status: any): string {
        let newStatus: string;
        switch (status) {
            case AppointmentStatus.PENDING:
                newStatus = 'Waiting for your confirmation.';
                break;
            case AppointmentStatus.RESERVED:
                newStatus = 'Waiting for your confirmation.';
                break;
            case AppointmentStatus.REJECTED:
                newStatus = 'Your did not confirm for this booking.';
                break;
            case AppointmentStatus.ACCEPTED:
                newStatus = 'Booking is confirmed';
                break;
            case AppointmentStatus.ON_THE_WAY:
                newStatus = 'You are on the way';
                break;
            case AppointmentStatus.ARRIVED:
                newStatus = 'You have arrived at the location';
                break;
            case AppointmentStatus.IN_PROGRESS:
                newStatus = 'Appointment is in progress';
                break;
            case AppointmentStatus.COMPLETED:
                newStatus = 'Completed';
                break;
            default:
                break;
        }
        return newStatus;
    }
}
