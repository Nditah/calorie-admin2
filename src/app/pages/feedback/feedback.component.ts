import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification, ApiResponse } from '../../models';
import { Notifications } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  page = 'List of Notifications';
  response: ApiResponse;
  currentRecords: Array<Notification>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public feedbacks: Notifications) {
      this.currentRecords = this.feedbacks.query();
    }

    ngOnInit() {
      // this.showNotification('getting saved information');
    }


    recordDelete(record: Notification): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.feedbacks.recordDelete(record).then((res: any) => {
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
      this.router.navigate(['notification/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`notification/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`notification/edit/${record.id}`]);
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
