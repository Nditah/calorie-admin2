import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../_services';
import { Router } from '@angular/router';
import { User, ApiResponse } from '../../_models';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  page = 'List of Users';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<User>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('users');
    if (storedRecords) {
        this.records = storedRecords;
        this.toast('getting saved information', 'custominfo');
        this.success = true;
    } else {
      this.recordRetrieve();
    }
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Users, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        this.loading = false;
        if (response.success) {
          this.records = response.payload;
          this.success = response.success;
        } else {
          this.toast(response.message, 'customerror');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  recordDelete(record: User): void {
    if (confirm('Are you sure you want to delete this record')) {
      this.crudService.delete(GetRoutes.Users + '/' + record.id)
        .then((data: ApiResponse) => {
          if (data.success) {
            this.records = this.records.filter(i => i.id !== record.id);
            this.utilsService.setLocalStorage('users', (this.records), null);
          } else {
            this.toast(data.message, 'customdanger');
          }
        }).catch(error => {
          this.toast(error, 'customdanger');
        });
    }
    return;
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
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('userEditId', record.id, null);
    this.router.navigate(['user/edit']);
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
