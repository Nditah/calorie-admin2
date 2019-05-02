import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../services';
import {ApiResponse, SelectOption} from '../../../models';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
})
export class FeedbackAddComponent implements OnInit {

  page = 'Add New Feedback Record';
  addForm: FormGroup;
  users: SelectOption[];
  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

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
    console.log(payload);
    return this.crudService.post(GetRoutes.Feedbacks, payload)
      .then((data: ApiResponse) => {
        this.response = data;
        if (this.response.success) {
          this.loading = false;
          this.reset();
          this.toast('Record added successfully', 'customsuccess');
          this.recordRetrieve();
          this.goToDetail(this.response.payload[0]);
        } else {
          this.loading = false;
          this.toast(this.response.message, 'customdanger');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err, 'customdanger');
      });
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Feedbacks, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        if (response.success && response.payload.length > 0 ) {
          this.loading = false;
          // this.records = response.payload;
          this.success = response.success;
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  getUsers() {
    const storedRecords = this.utilsService.getLocalStorage('users') || [];
    if (storedRecords.length > 0) {
      this.users = storedRecords.map(item => ({ id: item.id, text: item.fullname + ' ' + item.phone }));
      console.log(this.users);
      return;
    }
    return this.crudService.getAuth(GetRoutes.Users, true)
      .then((data: ApiResponse) => {
        if (data.success && data.payload.length > 0) {
          this.users = data.payload.map(item => ({ id: item.id, text: item.fullname + ' ' + item.phone }));
          console.log(this.users);
          return;
        }
      });
  }

  // Navigation
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('feedbackDetailId', record.id, null);
    this.router.navigate(['feedback/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('feedbackEditId', record.id, null);
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




