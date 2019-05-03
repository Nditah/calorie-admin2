import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse, SelectOption } from '../../../models';
import { Feedbacks, Users } from '../../../providers';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
})
export class FeedbackAddComponent implements OnInit {

  page = 'Add New Feedback Record';
  addForm: FormGroup;
  userOptions: SelectOption[];
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pNotifyService: PNotifyService,
    public feedbacks: Feedbacks,
    public users: Users) {
      this.getUsers();
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.getUsers();

    this.addForm = this.formBuilder.group({
      user: [null, Validators.required],
      message: ['', Validators.required],
      status: [''],
    });
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.loading = false;
      this.toast('this.addForm.invalid', 'customerror');
      return;
    }
    try {
      this.feedbacks.recordCreate(payload)
        .then((res: any) => {
          console.log(res);
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

  getUsers() {
    const userArray = this.users.query();
    this.userOptions = userArray.map(item => (
      { id: item.id, text: item.username + ' ' + item.phone }));
      console.log(userArray);
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`feedback/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`feedback/edit/${record.id}`]);
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
