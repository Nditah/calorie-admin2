import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../_services';
import { Router } from '@angular/router';
import { Nutrient, ApiResponse } from '../../_models';

@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.scss']
})
export class NutrientComponent implements OnInit {

  page = 'List of Nutrients';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Nutrient>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      const storedRecords = this.utilsService.getLocalStorage('nutrients');
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
      return this.crudService.getAuth(GetRoutes.Nutrients, true)
        .then((response: ApiResponse) => {
          this.message = response.message;
          this.loading = false;
          if (response.success) {
            console.log(response);
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

    recordDelete(record: Nutrient): void {
      if (confirm('Are you sure you want to delete this record')) {
        this.crudService.delete(GetRoutes.Nutrients + '/' + record.id)
          .then((data: ApiResponse) => {
            if (data.success) {
              this.records = this.records.filter(i => i.id !== record.id);
              this.utilsService.setLocalStorage('nutrients', (this.records), null);
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
      this.router.navigate(['nutrient/add']);
    }
    goToDetail(record: any): void {
      this.utilsService.setLocalStorage('nutrientDetailId', record.id, null);
      this.router.navigate(['nutrient/detail']);
      return;
    }
    goToEdit(record: any): void {
      this.utilsService.setLocalStorage('nutrientEditId', record.id, null);
      this.router.navigate(['nutrient/edit']);
    }

    // toast notification
    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }
  }
