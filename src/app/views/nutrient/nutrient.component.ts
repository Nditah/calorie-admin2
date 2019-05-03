import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { Nutrient, ApiResponse } from '../../models';
import { Nutrients } from '../../providers';

@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.component.html',
  styleUrls: ['./nutrient.component.scss']
})
export class NutrientComponent implements OnInit {

  page = 'List of Nutrients';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public nutrients: Nutrients) {
      this.records = this.nutrients.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
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
      this.router.navigate(['nutrient/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`nutrient/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`nutrient/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
