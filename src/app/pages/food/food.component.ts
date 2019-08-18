import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food, ApiResponse } from '../../models';
import { Foods } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  page = 'List of Foods';
  response: ApiResponse;
  currentRecords: Array<Food>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public foods: Foods) {
      this.currentRecords = this.foods.query();
    }

    ngOnInit() {
      // this.showNotification('getting saved information');
    }


    recordDelete(record: Food): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.foods.recordDelete(record).then((res: any) => {
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
      this.router.navigate(['food/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`food/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`food/edit/${record.id}`]);
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
