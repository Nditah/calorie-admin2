
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../../models';
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
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.foods.query({ id })[0];
      this.record = record || foods.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
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
