
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrient, ApiResponse } from '../../../models';
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
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.nutrients.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record || this.nutrients.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
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
