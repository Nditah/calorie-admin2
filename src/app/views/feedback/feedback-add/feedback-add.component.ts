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
      // this.getUsers();
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
    try {
      this.feedbacks.recordCreate(payload)
        .subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          this.loading = false;
          this.reset();
          this.toast('Record added successfully', 'customsuccess');
          this.goToDetail(res.payload[0]);
        } else {
          this.loading = false;
          this.toast(res.message, 'customdanger');
        }
      }, (err) => console.log(err.message));
      } catch (error) {
        this.loading = false;
        this.toast(error, 'customdanger');
      }
      this.goBack();
      return;
  }

  getUsers() {
    const userArray = this.users.query();
    this.userOptions = userArray.map(item => (
      { id: item.id, text: item.username + ' ' + item.phone }));
      console.log(this.userOptions);
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate(['feedback/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate(['feedback/edit']);
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




