
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrient } from '../../../models';
import { Nutrients } from '../../../providers';

@Component({
  selector: 'app-nutrient-detail',
  templateUrl: './nutrient-detail.component.html',
})
export class NutrientDetailComponent implements OnInit {

  records: Array<Nutrient>;
  record: Nutrient;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public nutrients: Nutrients) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.nutrients.query({ id })[0];
      this.record = record || nutrients.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['nutrient/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`nutrient/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
