import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Setting } from '../../../models';
import { PNotifyService, UtilsService } from '../../../services';


@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.component.html',
  // styleUrls: ['./setting-detail.component.scss']
})
export class SettingDetailComponent implements OnInit {

  page = 'Setting Details';
  records: Array<Setting>;
  record: Setting;

  response: any;
  success = false;
  message = '';
  notify: any;

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private pNotifyService: PNotifyService ) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('settingDetailId');
    if (!recordId) {
      this.toast('Invalid action', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.getRecord(recordId);
  }


  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('settings');
    console.log(storedRecords);
    if (!!storedRecords) {
      this.records = storedRecords;
      this.success = true;
    }
    return this.utilsService.getObjectByKey(this.records, 'id', recordId);
  }

  goBack() {
    this.router.navigate(['setting']);
  }

  goToEdit(record: Setting): void {
    this.utilsService.setLocalStorage('settingEditId', record.id, null);
    this.router.navigate(['setting/edit']);
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
