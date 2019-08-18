import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, ApiResponse } from '../../models';
import { Users } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  page = 'List of Users';
  response: ApiResponse;
  currentRecords: Array<any>;
  loading = false;

  constructor(private router: Router,
            private toastr: ToastrService,
            public users: Users) {
      this.currentRecords = this.users.query();
    }

    ngOnInit() {
      // this.showNotification('getting saved information');
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
            this.showNotification('Operation was successfull!');
          } else {
            this.showNotification(res.message);
          }
          }).catch(error => {
              this.showNotification(error.message);
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

    showNotification(message) {
      this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-primary alert-with-icon',
        });
      }

  }
