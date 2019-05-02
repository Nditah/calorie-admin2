import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback, ApiResponse } from '../../models';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {

  page = 'List of Feedbacks';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Feedback>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    public exercises: Feedbacks) {
      this.records = this.exercises.query();
    }

    ngOnInit() {
      // this.notify = this.pNotifyService.getPNotify();
      // this.records = this.exercises.query();
    }


    recordDelete(record: Feedback): void {
      if (confirm('Are you sure you want to delete this record')) {
        try {
              this.exercises.recordDelete(record);
          } catch (error) {
            console.log(error.message);
          }
      }
      return;
    }

    // Navigation
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
}
