import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService, CrudService, GetRoutes, PNotifyService } from '../../_services';
import { Setting, ApiResponse} from '../../_models';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  page = 'List of Settings';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Setting>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('settings');
    if (!!storedRecords) {
      this.records =  storedRecords;
      this.success = true;
    } else {
      this.recordRetrieve();
    }

  }
  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Settings + '?access=private', true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        if (response.success && response.payload.length > 0 ) {
          this.loading = false;
          this.records = response.payload;
          this.success = response.success;
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  // method to edit individual setting
  recordEdit(setting: Setting) {
    this.utilsService.setLocalStorage('settingEditId', setting.id, null); // set new id
    this.router.navigate(['setting/edit']); // navigate to new page
  }

  // Method to view a setting
  recordDetail(setting: Setting): void {
    this.utilsService.setLocalStorage('settingDetailId', setting.id, null);
    this.router.navigate(['setting/detail']);
    return;
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
