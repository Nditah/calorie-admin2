
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food, ApiResponse } from '../../../models';
import { Foods } from '../../../providers';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
})
export class FoodDetailComponent implements OnInit {

  records: Array<Food>;
  record: Food;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public foods: Foods) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.foods.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record || this.foods.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['food/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`food/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
