import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { Setting, ApiResponse } from '../../models';
import { Settings } from '../../providers';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  page = 'List of Settings';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public settings: Settings) {
      this.records = this.settings.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
    }

    goToAdd(): void {
      this.router.navigate(['setting/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`setting/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`setting/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
