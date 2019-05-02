import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../../providers';
import { User, ApiResponse } from '../../../models';


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

  loading = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public users: Users) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.record = this.users.query({ id })[0];
     }

  ngOnInit() {
    // console.log('records ' + this.record);
    this.editForm = this.formBuilder.group({
      type: [''], // ["ADMIN", "USER"]
      username: [''],
      gender: [''], // ["MALE", "FEMALE"]
      birth_date: [''],
      phone: [''],
      country_iso2: [''],
      email: [''],
      is_email_verified: [''],
      is_phone_verified: [''],
      password: [''],
      confirm_password: [''],
      original_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [''],
      is_complete: [''],
    });
  
    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('username').setValue(this.record.username || '');
    this.editForm.get('gender').setValue(this.record.gender || '');
    this.editForm.get('birth_date').setValue(this.record.birth_date || '');
    this.editForm.get('country_iso2').setValue(this.record.country_iso2 || '');
    this.editForm.get('password').setValue(this.record.password || '');
    this.editForm.get('confirm_password').setValue(this.record.confirm_password || '');
    this.editForm.get('email').setValue(this.record.email || '');
    this.editForm.get('is_email_verified').setValue(this.record.is_email_verified || '');
    this.editForm.get('phone').setValue(this.record.phone || '');
    this.editForm.get('is_phone_verified').setValue(this.record.is_phone_verified || '');
    this.editForm.get('original_mass').setValue(this.record.original_mass || '');
    this.editForm.get('desired_mass').setValue(this.record.desired_mass || '');
    this.editForm.get('lifestyle').setValue(this.record.lifestyle || '');
    this.editForm.get('height').setValue(this.record.height || '');
    this.editForm.get('is_complete').setValue(this.record.is_complete || '');
    console.log('\nrecord Name', typeof this.record, this.record);
  }
  
  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    try {
      this.users.recordUpdate(this.record, payload)
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
    this.router.navigate(['user/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`user/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
