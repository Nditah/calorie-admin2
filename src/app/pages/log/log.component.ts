import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Log, ApiResponse } from '../../models';
import { Logs } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  page = 'List of Logs';
  response: ApiResponse;
  currentRecords: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public logs: Logs) {
      this.currentRecords = this.logs.query();
    }

    ngOnInit() {
    }


    recordDelete(record: Log): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.logs.recordDelete(record).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.showNotification('Operation was successfull!');
          } else {
            this.showNotification(res.message);
          }
          }).catch(error => {
              this.showNotification(error.message);
          });
      }
      this.loading = false;
      return;
    }

    goToAdd(): void {
      this.router.navigate(['log/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`log/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`log/edit/${record.id}`]);
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
