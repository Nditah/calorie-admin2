import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notifications, Users } from '../../../providers';
import { Notification, ApiResponse, SelectOption, User } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { deepPropsExist, isEqual } from 'src/app/helpers';


@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
})
export class FeedbackEditComponent implements OnInit {

  page = 'Edit Feedback Record';
  editForm: FormGroup;
  records: Array<Notification>;
  record: Notification;
  userOptions: SelectOption[];
  userRecords: Array<User>;
  prevUserRecords: Array<User>;

  date: any;

  loading = false;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              public feedbacks: Notifications,
              public users: Users) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.feedbacks.query({ id })[0];
      this.userRecords = this.users.query();
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      user: [''], // ["DEFAULT", "CUSTOM"]
      type: [''],
      title: [''],
      message: [''], // enum: ["SPORT", "WORKOUT"]
      status: [''],
    });

    this.editForm.patchValue({
      user: deepPropsExist(this.record, 'user', 'id') ? this.record.user.id : '',
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      title: deepPropsExist(this.record, 'title') ? this.record.title : '',
      message: deepPropsExist(this.record, 'message') ? this.record.message : '',
      status: deepPropsExist(this.record, 'status') ? this.record.status : '',
    });

    console.log('\nrecord ', typeof this.record, this.record);
  }

  ngDoCheck() {
    if (!isEqual(this.userRecords, this.prevUserRecords)) {
      this.prevUserRecords = [...this.userRecords];
      this.getUserOptions();
    }
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
