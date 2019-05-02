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
      if (confirm('Are you sure you want to delete this record')) {
        try {
              this.feedbacks.recordDelete(record).subscribe((res: ApiResponse) => {
                console.log(res);
              if (res.success && res.payload.length > 0) {
                console.log('Operation was successfull!');
              } else {
                console.log(res.message);
              }
            }, (err) => console.log(err.message));
          } catch (error) {
            console.log(error.message);
          }
      }
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
