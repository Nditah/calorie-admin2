import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs, Foods, Exercises } from '../../../providers';
import { Log, ApiResponse, SelectOption } from '../../../models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
})
export class LogEditComponent implements OnInit {

  page = 'Edit Log Record';
  editForm: FormGroup;
  record: Log;
  date: any;

  notify: any;
  loading = false;

  foodOptions: SelectOption[];
  exerciseOptions: SelectOption[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              public logs: Logs,
              public exercises: Exercises,
              public foods: Foods) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const record = this.logs.query({ id })[0];
        this.record = record || logs.defaultRecord;
        console.log(record);
      }

  ngOnInit() {
    this.getFoods();
    this.getExercises();

    this.editForm = this.formBuilder.group({
      day: [''],
      food: [''],
      food_quantity: [''],
      exercise: [''],
      exercise_duration: [''],
      remark: [''],
    });

    this.editForm.get('day').setValue(this.record.day || '');
    this.editForm.get('food').setValue(this.record.food || '');
    this.editForm.get('food_quantity').setValue(this.record.food_quantity);
    this.editForm.get('exercise').setValue(this.record.exercise || '');
    this.editForm.get('exercise_duration').setValue(this.record.exercise_duration);
    this.editForm.get('remark').setValue(this.record.remark || '');
  }

  onSubmit() {
    const payload = this.editForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.logs.recordUpdate(this.record, payload)
      .then((res: any) => {
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

  getFoods() {
    const foodArray = this.foods.query();
    this.foodOptions = foodArray.map(item => (
      { id: item.id, text: item.name }));
      console.log(foodArray);
  }

  getExercises() {
    const exerciseArray = this.exercises.query();
    this.exerciseOptions = exerciseArray.map(item => (
      { id: item.id, text: item.name }));
      console.log(exerciseArray);
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
