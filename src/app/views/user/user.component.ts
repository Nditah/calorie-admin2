import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { User, ApiResponse } from '../../models';
import { Users } from '../../providers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  page = 'List of Users';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public users: Users) {
      this.records = this.users.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
    }


    recordDelete(record: User): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.users.recordDelete(record).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.toast('Operation was successfull!', 'custominfo');
          } else {
            this.toast(res.message, 'customerror');
          }
          }).catch(error => {
              this.toast(error.message, 'customerror');
          });
      }
      this.loading = false;
      return;
    }

    goToAdd(): void {
      this.router.navigate(['user/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`user/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`user/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
