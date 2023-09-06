
import { Notification } from '../models/notification.model';
import { AppointmentStatus, AppointmentStatusCode } from '../models/appointment.model';

export function NotificationAssembler(
      notifcationStatus: AppointmentStatus,
      bookingId: string,
      referenceNo: string,
      registrationToken: any,
      serviceProviderId: any,
      clientId: any,
      providerName: any,
      clientName: any
      ) {
            const notificationRequest: Notification = new Notification();
            notificationRequest.badgeCounter = '1';
            notificationRequest.contentAvailable = 'false';
            notificationRequest.title = 'APPOINTMENT ' + referenceNo;
            notificationRequest.bookingId = bookingId;
            notificationRequest.devices = [{
                  deviceId: registrationToken
            }];
            notificationRequest.priority = 'high';
            notificationRequest.message = `{ bookingId: ${bookingId} }`;
            notificationRequest.sender = serviceProviderId;
            notificationRequest.receiver = clientId;

            switch (notifcationStatus) {
                  case AppointmentStatus.ACCEPTED:
                        notificationRequest.body = `Hi, ${clientName}. Your appointment request has been accepted by your preferred stylist, ${providerName}.`;
                        break;
                  case AppointmentStatus.REJECTED:
                        notificationRequest.body = `Hi, ${clientName}. Sorry to inform you but, your preferred stylist, ${providerName} has declined your appointment request.`;
                        break;
                  case AppointmentStatus.ON_THE_WAY:
                        notificationRequest.body = `Hi, ${clientName}. You have an upcoming appointment for today and your stylist, ${providerName} is on the way. You can chat or contact your stylist to help him locate your exact location. You can track his/here whereabouts thru the appointment details page. `;
                        break;
                  case AppointmentStatus.ARRIVED:
                        notificationRequest.body = `Hi, ${clientName}. Your stylist, ${providerName} has arrived at your location. If your stylist is having with your exact location, please contact your stylist.`;
                        break;
                  case AppointmentStatus.COMPLETED:
                        notificationRequest.body = `Hi, ${clientName}. Your appointment with REFERENCE NUMBER: ${referenceNo}, has been completed, please provide feedbacks or commend your stylist to help us improve our service. Thank you.`;
                        break;
                  case AppointmentStatus.PENDING:
                        notificationRequest.body = `Hi, ${clientName}. Your appointment with REFERENCE NUMBER: ${referenceNo}, has been completed, please provide feedbacks or commend your stylist to help us improve our service. Thank you.`;
                        break;
                  case AppointmentStatus.RESERVED:
                        notificationRequest.body = `Hi, ${clientName}. Your appointment with REFERENCE NUMBER: ${referenceNo}, has been completed, please provide feedbacks or commend your stylist to help us improve our service. Thank you.`;
                        break;
                  case AppointmentStatus.IN_PROGRESS:
                        notificationRequest.badgeCounter = '0';
                        notificationRequest.contentAvailable = 'true';
                        notificationRequest.body = `Hi, ${clientName}. Your appointment with REFERENCE NUMBER: ${referenceNo}, has been completed, please provide feedbacks or commend your stylist to help us improve our service. Thank you.`;
                        break;
                  default:
                        notificationRequest.body = '';
                        break;
            }

            return notificationRequest;
}
