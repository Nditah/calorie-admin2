import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs, Foods, Exercises } from '../../../providers';
import { Log, ApiResponse, SelectOption } from '../../../models';
import { PNotifyService } from '../../../services';


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
      private pNotifyService: PNotifyService,
      public logs: Logs,
      public exercises: Exercises,
      public foods: Foods) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const record = this.logs.query({ id })[0];
        this.record = record || logs.defaultRecord;
        console.log(record);
      }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
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
        this.toast(res.message, 'customerror');
      }
    }, (err) => this.toast(err.message, 'customerror'));
      } catch (error) {
        this.toast(error.message, 'customerror');
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

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
