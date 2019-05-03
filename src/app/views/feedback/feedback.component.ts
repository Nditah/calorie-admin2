import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { Feedback, ApiResponse } from '../../models';
import { Feedbacks } from '../../providers';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  page = 'List of Feedbacks';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public feedbacks: Feedbacks) {
      this.records = this.feedbacks.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
    }


    recordDelete(record: Feedback): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.feedbacks.recordDelete(record).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.toast('Operation was successfull!', 'custominfo');
          } else {
            this.toast(res.message, 'customerror');
          }
          }).catch(error => {
              this.toast(error.message, 'customerror');
          });
      }
      this.loading = false;
      return;
    }

    goToAdd(): void {
      this.router.navigate(['feedback/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`feedback/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`feedback/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
