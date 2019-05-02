import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import {ApiResponse, User, SelectOption} from '../../../models';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  page = 'Profile';
  editProfile: FormGroup;
  users: Array<User>;
  user: User;
  date: any;

  response: ApiResponse;
  // response: any;
  success = false;
  message = '';

  counties: SelectOption[];
  activeCountry: SelectOption[];
  states: SelectOption[];
  activeState: SelectOption[];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getCounties();
    this.getStates();
    const userId = this.utilsService.getLocalStorage('userEditId');
    if (!userId) {
      alert('Invalid action. no user selected');
      this.router.navigate(['user']);
      return;
    }
    this.user = this.utilsService.cleanObject(this.getRecord(userId));
    // console.log('users ' + this.user);

  this.editProfile = this.formBuilder.group({
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

    this.editProfile.get('address').setValue(this.user.address || '');
    this.editProfile.get('password').setValue(this.user.password || '');
    console.log('\nProfile Name', typeof this.user, this.user);
  }

  getCounties() {

  }

  getStates() {

  }


  // new get record
  getRecord(userId) {
    const storedRecords = this.utilsService.getLocalStorage('users');
    if (storedRecords) {
        this.users = storedRecords;
    }
    const t = this.utilsService.getObjectByKey(this.users, 'id', userId);
      return t;
  }

  onSubmit() {
    const payload = this.editProfile.value;
    payload.id = this.user.id;
    console.log('editProfile payload ', payload);
    payload.counties_id = payload.counties;
    payload.driver_id = payload.driver;

    delete payload.city;
    delete payload.driver;


  }

  userRetrieve() {

  }

  goBack() {
    window.history.back();
  }
  reset() {}

}
