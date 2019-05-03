import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../models';
import { Users } from '../../../providers';
import { PNotifyService  } from '../../../services';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {

  page = 'Add New User';
  addForm: FormGroup;
  nutrientOptions: SelectOption[];

  loading = false;
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public users: Users,
    private pNotifyService: PNotifyService) {}

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // ["ADMIN", "USER"]
      username: ['', Validators.required],
      gender: ['', Validators.required], // ["MALE", "FEMALE"]
      birth_date: [''],
      phone: ['', Validators.required],
      country_iso2: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      original_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [''],
    });

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (payload.password !== payload.confirm_password) {
      return;
    }
    delete payload.confirm_password;
    console.log(payload);
    if (this.addForm.invalid) {
      this.loading = false;
      this.toast('this.addForm.invalid', 'customerror');
      return;
    }
    try {
      this.users.recordCreate(payload)
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
  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`user/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`user/edit/${record.id}`]);
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
