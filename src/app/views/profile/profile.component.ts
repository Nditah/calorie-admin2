import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../_services';
import { User, ApiResponse } from '../../_models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  message = '';
  user: User;
  notify: any;
  response: ApiResponse;
  success = false;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.user = Object.assign({}, JSON.parse(localStorage.getItem('user')));
    // this.user = Object.assign({}, this.utilsService.getLocalStorage('user'));
    if (typeof this.user.id === 'string') {
      const user = this.utilsService.cleanObject(this.getRecord(this.user.id));
      if (typeof user.username === 'string') {
        this.user = Object.assign({}, user);
        this.utilsService.setLocalStorage('user', this.user, null);
      } else {
        this.staffRetrieve(this.user.id);
      }
    } else {
      console.log('User not found ', this.user);
    }
    console.log('\n User Name', typeof this.user, Object.keys(this.user));
  }

  staffRetrieve(id: string) {
    if (!id) { return; }
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Users + '?_id=' + id, false)
      .then((response: ApiResponse) => {
        console.log('response ===', response);
        this.message = response.message;
        if (response.success && response.payload.length > 0 ) {
          this.loading = false;
          this.user = Object.assign({}, response.payload[0]);
          this.success = response.success;
          this.utilsService.setLocalStorage('user', this.user, null);
          this.loading = false;
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  getRecord(userId) {
    console.log('\n User Id ', userId);
    const storedRecords = this.utilsService.getLocalStorage('staff');
    if (typeof storedRecords === 'undefined' || storedRecords === 'null') {
        this.success = true;
        this.user = this.utilsService.getObjectByKey(storedRecords, 'id', userId);
    }
  }

  profileEdit(user: User): void {
    this.utilsService.removeLocalStorage('profileEditId');
    this.utilsService.setLocalStorage('profileEditId', user.id, null);
    this.router.navigate(['profile/edit']);
  }
  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
