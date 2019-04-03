import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../_services';
import { Router } from '@angular/router';
import { Notification, ApiResponse } from '../../_models';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {

  page = 'List of Notifications';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Notification>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('notifications');
    if (storedRecords) {
        this.records = storedRecords;
        this.toast('getting saved information', 'custominfo');
        this.success = true;
    } else {
      this.recordRetrieve();
    }
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Notifications, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        if (response.success) {
          this.loading = false;
          this.records = response.payload;
          this.success = response.success;
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  recordDelete(record: Notification): void {
    if (confirm('Are you sure you want to delete this record')) {
      this.crudService.delete(GetRoutes.Notifications + '/' + record.id)
        .then((data: ApiResponse) => {
          if (data.success) {
            this.records = this.records.filter(i => i.id !== record.id);
            this.utilsService.setLocalStorage('notifications', (this.records), null);
          } else {
            this.toast(data.message, 'customdanger');
          }
        }).catch(error => {
          this.toast(error, 'customdanger');
        });
    }
    return;
  }

// Navigation
  goToAdd(): void {
    this.router.navigate(['notification/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('notificationDetailId', record.id, null);
    this.router.navigate(['notification/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('notificationEditId', record.id, null);
    this.router.navigate(['notification/edit']);
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
