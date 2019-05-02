
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models';
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
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.record = this.users.query({ id })[0];
      console.log(this.record);
    }

  ngOnInit() {
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
