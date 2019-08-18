import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, SelectOption, Exercise, Food } from '../../../models';
import { Logs, Foods, Exercises } from '../../../providers';
import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
})
export class LogAddComponent implements OnInit {

  page = 'Add New Log';
  addForm: FormGroup;
  foodOptions: SelectOption[];
  foodRecords: Array<Food>;
  prevFoodRecords: Array<Food>;
  exerciseOptions: SelectOption[];
  exerciseRecords: Array<Exercise>;
  prevExerciseRecords: Array<Exercise>;
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public logs: Logs,
              public exercises: Exercises,
              public foods: Foods) {
      this.foodRecords = this.foods.query();
      this.exerciseRecords = this.exercises.query();
    }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      day: [null, Validators.required],
      food: [null, Validators.required],
      food_quantity: [null, Validators.required],
      exercise: [null, Validators.required],
      exercise_duration: [null, Validators.required],
      remark: [null, Validators.required],
    });
  }

  ngDoCheck() {
    if (!isEqual(this.foodRecords, this.prevFoodRecords)) {
      this.prevFoodRecords = [...this.foodRecords];
      this.getFoodOptions();
    }
    if (!isEqual(this.exerciseRecords, this.prevExerciseRecords)) {
      this.prevExerciseRecords = [...this.exerciseRecords];
      this.getExercisesOptions();
    }
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.loading = false;
      this.showNotification('this.addForm.invalid');
      return;
    }
    try {
      this.logs.recordCreate(payload)
        .then((res: any) => {
          console.log(res);
          if (res.success) {
            this.goToDetail(res.payload);
          } else {
            this.showNotification(res.message);
          }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
    }
      return;
  }

  getFoodOptions() {
    this.foodOptions = this.foodRecords.map(item => (
      { id: item.id, text: item.name }));
  }

  getExercisesOptions() {
    this.exerciseOptions = this.exerciseRecords.map(item => (
      { id: item.id, text: item.name }));
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`log/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`log/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }
}
