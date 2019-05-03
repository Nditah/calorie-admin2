import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse, SelectOption } from '../../../models';
import { Logs, Foods, Exercises } from '../../../providers';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
})
export class LogAddComponent implements OnInit {

  page = 'Add New Log';
  addForm: FormGroup;
  foodOptions: SelectOption[];
  exerciseOptions: SelectOption[];
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pNotifyService: PNotifyService,
    public logs: Logs,
    public exercises: Exercises,
    public foods: Foods) {
      this.getFoods();
      this.getExercises();
      this.getFoods();
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.getExercises();
    this.getFoods();

    this.addForm = this.formBuilder.group({
      day: [null, Validators.required],
      food: [null, Validators.required],
      food_quantity: [null, Validators.required],
      exercise: [null, Validators.required],
      exercise_duration: [null, Validators.required],
      remark: [null, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.loading = false;
      this.toast('this.addForm.invalid', 'customerror');
      return;
    }
    try {
      this.logs.recordCreate(payload)
        .then((res: any) => {
          console.log(res);
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
      console.log(foodArray.length);
  }

  getExercises() {
    const exerciseArray = this.exercises.query();
    this.exerciseOptions = exerciseArray.map(item => (
      { id: item.id, text: item.name }));
      console.log(exerciseArray.length);
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
