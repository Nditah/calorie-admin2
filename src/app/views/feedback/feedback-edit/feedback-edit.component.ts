import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedbacks } from '../../../providers';
import { Feedback, ApiResponse } from '../../../models';


@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
})
export class FeedbackEditComponent implements OnInit {

  page = 'Edit Feedback Record';
  editForm: FormGroup;
  records: Array<Feedback>;
  record: Feedback;
  date: any;

  loading = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public feedbacks: Feedbacks) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.feedbacks.query({ id })[0];
      this.record = record || feedbacks.defaultRecord;
      console.log(record);
     }

  ngOnInit() {
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      user: [''], // ["DEFAULT", "CUSTOM"]
      message: [''], // enum: ["SPORT", "WORKOUT"]
      status: [''],
    });

    this.editForm.get('user').setValue(this.record.user || '');
    this.editForm.get('message').setValue(this.record.message || '');
    this.editForm.get('status').setValue(this.record.status || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    try {
      this.feedbacks.recordUpdate(this.record, payload)
      .subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success && res.payload.length > 0) {
        console.log('Operation was successfull!');
      } else {
        console.log(res.message);
      }
    }, (err) => console.log(err.message));
      } catch (err) {
        console.log(err.message);
      }
      this.goBack();
      return;
  }

  goToAdd(): void {
    this.router.navigate(['feedback/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`feedback/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
