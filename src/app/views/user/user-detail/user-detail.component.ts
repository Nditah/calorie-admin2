
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, ApiResponse } from '../../../models';
import { Users } from '../../../providers';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

  records: Array<User>;
  record: User;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public users: Users) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.users.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['user/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`user/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
