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
      if (confirm('Are you sure you want to delete this record')) {
        try {
              this.nutrients.recordDelete(record).subscribe((res: ApiResponse) => {
                console.log(res);
              if (res.success && res.payload.length > 0) {
                console.log('Operation was successfull!');
              } else {
                console.log(res.message);
              }
            }, (err) => console.log(err.message));
          } catch (error) {
            console.log(error.message);
          }
      }
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
