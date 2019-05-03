import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PNotifyService } from '../../../services';
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
  notify: any;
  date: any;

  loading = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pNotifyService: PNotifyService,
    public feedbacks: Feedbacks) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.feedbacks.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
  }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

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
    console.log(payload);
    this.loading = true;
    try {
      this.feedbacks.recordUpdate(this.record, payload)
      .then((res: any) => {
      if (res.success) {
        this.goToDetail(res.payload);
      } else {
        this.toast(res.message, 'customerror');
      }
    }, (err) => this.toast(err.message, 'customerror'));
      } catch (error) {
        this.toast(error.message, 'customerror');
      }
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

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
