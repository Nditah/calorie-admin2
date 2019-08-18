import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../models';
import { Users } from '../../../providers';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {

  page = 'Add New User';
  addForm: FormGroup;
  nutrientOptions: SelectOption[];

  loading = false;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              public users: Users,
              ) {}

  ngOnInit() {

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
      this.showNotification('this.addForm.invalid');
      return;
    }
    try {
      this.users.recordCreate(payload)
        .then((res: any) => {
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }
}
