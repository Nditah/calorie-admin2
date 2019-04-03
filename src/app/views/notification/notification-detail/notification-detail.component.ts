
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../_services';
import { Notification, User } from '../../../_models';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
})
export class NotificationDetailComponent implements OnInit {

  records: Array<Notification>;
  record: Notification;

  response: any;
  success = false;
  message = '';
  notify: any;
  loading = false;

  constructor( private router: Router,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('notificationDetailId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    console.log('\n record Name', typeof this.record, JSON.stringify(this.record));
  }

  getRecord(recordId) {
    console.log('\n record Id ', recordId);
    const storedRecords = this.utilsService.getLocalStorage('notifications');
    if (storedRecords) {
        this.records = storedRecords;
        this.success = true;
    }
    return this.utilsService.getObjectByKey(this.records, 'id', recordId);
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['notification/add']);
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('notificationEditId', record.id, null);
    this.router.navigate(['notification/edit']);
  }

  goBack() {
    window.history.back();
  }

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
