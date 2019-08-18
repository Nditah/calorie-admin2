import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, SelectOption, User } from '../../../models';
import { Notifications, Users } from '../../../providers';
import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
})
export class FeedbackAddComponent implements OnInit {

  page = 'Add New Feedback Record';
  addForm: FormGroup;
  userOptions: SelectOption[];
  userRecords: Array<User>;
  prevUserRecords: Array<User>;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public feedbacks: Notifications,
              public users: Users) {
                this.userRecords = this.users.query();
    }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      user: [null, Validators.required],
      type: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngDoCheck() {
    if (!isEqual(this.userRecords, this.prevUserRecords)) {
      this.prevUserRecords = [...this.userRecords];
      this.getUserOptions();
    }
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    // payload.status = 'UNREAD';
    if (this.addForm.invalid) {
      this.loading = false;
      this.showNotification('this.addForm.invalid');
      return;
    }
    try {
      this.feedbacks.recordCreate(payload)
        .then((res: ApiResponse) => {
          console.log(res);
          if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.showNotification(res.message);
        }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
    }
      return;
  }

  getUserOptions() {
    this.userOptions = this.userRecords.map(item => (
      { id: item.id, text: item.username + ' ' + item.phone }));
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`notification/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`notification/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
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
