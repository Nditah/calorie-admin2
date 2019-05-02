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
  records: Array<Log>;
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
    this.loading = true;
    try {
      this.logs.recordUpdate(this.record, payload)
      .subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success && res.payload.length > 0) {
        console.log('Operation was successfull!');
      } else {
        console.log(res.message);
      }
    }, (err) => console.log(err.message));
      } catch (err) {
        console.log(err.message);
      }
      this.goBack();
      return;
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['log/add']);
  }
  goToDetail(record: any): void {
    this.router.navigate([`log/detail/${record.id}`]);
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
  getFoods() {
    const foodArray = this.foods.query();
    this.foodOptions = foodArray.map(item => (
      { id: item.id, text: item.type + ' ' + item.name }));
      console.log(this.foodOptions);
  }
  getExercises() {
    const exerciseArray = this.exercises.query();
    this.exerciseOptions = exerciseArray.map(item => (
      { id: item.id, text: item.type + ' ' + item.name }));
      console.log(this.exerciseOptions);
  }

}
