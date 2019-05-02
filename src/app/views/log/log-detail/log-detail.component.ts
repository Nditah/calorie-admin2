
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import { Log, User, SelectOption } from '../../../models';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
})
export class LogDetailComponent implements OnInit {

  records: Array<Log>;
  record: Log;

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
    const recordId = this.utilsService.getLocalStorage('logDetailId');
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
    const storedRecords = this.utilsService.getLocalStorage('logs');
    if (storedRecords) {
        this.records = storedRecords;
        this.success = true;
    }
    return this.utilsService.getObjectByKey(this.records, 'id', recordId);
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['log/add']);
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('logEditId', record.id, null);
    this.router.navigate(['log/edit']);
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
