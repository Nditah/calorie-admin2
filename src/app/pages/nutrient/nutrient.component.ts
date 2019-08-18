import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nutrient, ApiResponse } from '../../models';
import { Nutrients } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.scss']
})
export class NutrientComponent implements OnInit {

  page = 'List of Nutrients';
  response: ApiResponse;
  currentRecords: Array<Nutrient>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public nutrients: Nutrients) {
      this.currentRecords = this.nutrients.query();
    }

    ngOnInit() {
      // this.showNotification('getting saved information');
    }


    recordDelete(record: Nutrient): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.nutrients.recordDelete(record).then((res: any) => {
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
      this.router.navigate(['nutrient/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`nutrient/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`nutrient/edit/${record.id}`]);
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
