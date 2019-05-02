
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, User } from '../../../models';
import { Exercises } from '../../../providers';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  records: Array<Exercise>;
  record: Exercise;

  response: any;
  success = false;
  message = '';
  notify: any;
  loading = false;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public exercises: Exercises) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.exercises.query({ id })[0];
      this.record = record || exercises.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
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
