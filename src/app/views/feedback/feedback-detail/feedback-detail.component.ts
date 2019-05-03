
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback, ApiResponse } from '../../../models';
import { Feedbacks } from '../../../providers';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
})
export class FeedbackDetailComponent implements OnInit {

  records: Array<Feedback>;
  record: Feedback;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public feedbacks: Feedbacks) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.feedbacks.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record || this.feedbacks.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['feedback/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`feedback/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
