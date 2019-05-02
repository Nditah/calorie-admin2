
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from '../../../models';
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
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.feedbacks.query({ id })[0];
      this.record = record || feedbacks.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
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
