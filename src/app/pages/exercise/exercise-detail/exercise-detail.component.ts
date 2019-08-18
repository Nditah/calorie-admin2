
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, ApiResponse } from '../../../models';
import { Exercises } from '../../../providers';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  records: Array<Exercise>;
  record: Exercise;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public exercises: Exercises) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.exercises.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const [record] = [...res.payload];
        this.record = record || this.exercises.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['exercise/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`exercise/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
