import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../../providers';
import { User } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { deepPropsExist } from 'src/app/helpers';

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
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public users: Users
    ) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.users.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
     }

  ngOnInit() {

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
      // password: [''],
      // confirm_password: [''],
      original_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [''],
      is_complete: [''],
    });
    this.editForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      username: deepPropsExist(this.record, 'username') ? this.record.username : '',
      gender: deepPropsExist(this.record, 'gender') ? this.record.gender : '',
      birth_date: deepPropsExist(this.record, 'birth_date') ? this.record.birth_date : '',
      country_iso2: deepPropsExist(this.record, 'country_iso2') ? this.record.country_iso2 : '',
      email: deepPropsExist(this.record, 'email') ? this.record.email : '',
      is_email_verified: deepPropsExist(this.record, 'is_email_verified') ? this.record.is_email_verified : '',
      phone: deepPropsExist(this.record, 'phone') ? this.record.phone : '',
      is_phone_verified: deepPropsExist(this.record, 'is_phone_verified') ? this.record.is_phone_verified : '',
      original_mass: deepPropsExist(this.record, 'original_mass') ? this.record.original_mass : '',
      desired_mass: deepPropsExist(this.record, 'desired_mass') ? this.record.desired_mass : '',
      lifestyle: deepPropsExist(this.record, 'lifestyle') ? this.record.lifestyle : '',
      height: deepPropsExist(this.record, 'height') ? this.record.height : '',
      is_complete: deepPropsExist(this.record, 'is_complete') ? this.record.is_complete : ''
    });
    console.log('\nrecord Name', typeof this.record, this.record);
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.users.recordUpdate(this.record, payload)
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
