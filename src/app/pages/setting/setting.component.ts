import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Setting, ApiResponse } from '../../models';
import { Settings } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  page = 'List of Settings';
  response: ApiResponse;
  currentRecords: Array<Setting>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public settings: Settings) {
      this.currentRecords = this.settings.query();
    }

    ngOnInit() {
    }

    goToDetail(record: any): void {
      this.router.navigate([`setting/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`setting/edit/${record.id}`]);
    }

    showNotification(message) {
      this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-primary alert-with-icon',
        });
      }

  }
