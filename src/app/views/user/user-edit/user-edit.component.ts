import { User } from '../../../_models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {

  page = 'Edit User Record';
  editForm: FormGroup;
  records: Array<User>;
  record: User;
  date: any;

  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  counties: SelectOptionInterface[];
  activeCountry: SelectOptionInterface[];
  banks: SelectOptionInterface[];
  activeState: SelectOptionInterface[];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const userId = this.utilsService.getLocalStorage('userEditId');
    if (!userId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(userId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      id: [''],
      type: [''], // ["ADMIN", "USER"]
      username: [''],
      gender: [''], // ["MALE", "FEMALE"]
      phone: [''],
      address: [''],
      country_iso2: [''],
      email: [''],
      is_email_verified: [''],
      is_phone_verified: [''],
      password: [''],
      original_mass: [''],
      current_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [''],
      logs: [''],
      notifications: [''],
      is_complete: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('username').setValue(this.record.username || '');
    this.editForm.get('gender').setValue(this.record.gender || '');
    this.editForm.get('country_iso2').setValue(this.record.country_iso2 || '');
    this.editForm.get('password').setValue(this.record.password || '');
    this.editForm.get('email').setValue(this.record.email || '');
    this.editForm.get('phone').setValue(this.record.phone || '');
    console.log('\nrecord Name', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('users');
    if (storedRecords) {
        this.records = storedRecords;
    }
    const t = this.utilsService.getObjectByKey(this.records, 'id', recordId);
      return t;
  }


  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    console.log('editForm payload ', payload);
    return this.crudService.put(GetRoutes.Users + '/' + this.record.id, payload)
      .then((data: ApiResponse) => {
        this.response = data;
        this.record = this.response.payload;
        if (this.response.success) {
          this.loading = false;
          this.toast('Record updated successfully', 'customsuccess');
          this.recordRetrieve();
          this.goBack();
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
    return this.crudService.getAuth(GetRoutes.Users, true)
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

  // Navigation
  goToAdd(): void {
    this.router.navigate(['user/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('userDetailId', record.id, null);
    this.router.navigate(['user/detail']);
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
