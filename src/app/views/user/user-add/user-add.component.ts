import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../services';
import {ApiResponse, SelectOption} from '../../../models';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {

  page = 'Add New User';
  addForm: FormGroup;
  logs: SelectOption[];
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
    this.getLogs();

    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // ["ADMIN", "USER"]
      username: ['', Validators.required],
      gender: ['', Validators.required], // ["MALE", "FEMALE"]
      phone: ['', Validators.required],
      country_iso2: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      original_mass: [''],
      current_mass: [''],
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
    delete payload.confirm_password;
    console.log(payload);
    return this.crudService.post(GetRoutes.Users, payload)
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

  getLogs() {
    const storedRecords = this.utilsService.getLocalStorage('logs') || [];
    if (storedRecords.length > 0) {
      this.logs = storedRecords.map(item => ({ id: item.id, text: item.name }));
      console.log(this.logs);
      return;
    }
    return this.crudService.getAuth(GetRoutes.Logs, true)
      .then((data: ApiResponse) => {
        if (data.success && data.payload.length > 0) {
          this.logs = data.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.logs);
          return;
        }
      });
  }

  // Navigation
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('userDetailId', record.id, null);
    this.router.navigate(['user/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('userEditId', record.id, null);
    this.router.navigate(['user/edit']);
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




