import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../services';
import { Router } from '@angular/router';
import { Food, ApiResponse } from '../../models';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
})
export class FoodComponent implements OnInit {

  page = 'List of Foods';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Food>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('foods') || [];
    if (storedRecords && storedRecords.length > 0) {
        this.records = storedRecords;
        this.toast('getting saved information', 'custominfo');
        this.success = true;
    } else {
      this.recordRetrieve();
    }
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Foods, true)
      .then((response: ApiResponse) => {
        this.loading = false;
        this.message = response.message;
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

  recordDelete(record: Food): void {
    if (confirm('Are you sure you want to delete this record')) {
      this.crudService.delete(GetRoutes.Foods + '/' + record.id)
        .then((data: ApiResponse) => {
          if (data.success) {
            this.records = this.records.filter(i => i.id !== record.id);
            this.utilsService.setLocalStorage('foods', (this.records), null);
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
    this.router.navigate(['food/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('foodDetailId', record.id, null);
    this.router.navigate(['food/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('foodEditId', record.id, null);
    this.router.navigate(['food/edit']);
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
