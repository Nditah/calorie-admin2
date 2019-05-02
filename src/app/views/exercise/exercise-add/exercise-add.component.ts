import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption, ApiResponse } from '../../../models';
import { Exercises } from '../../../providers';


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
})
export class ExerciseAddComponent implements OnInit {

  page = 'Add New Exercise';
  addForm: FormGroup;
  foods: SelectOption[];
  users: SelectOption[];

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public exercises: Exercises) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // ["DEFAULT", "CUSTOM"]
      category: ['', Validators.required], // ["SPORT", "WORKOUT"]
      name: ['', Validators.required],
      description: ['', Validators.required],
      calorie_rate: ['', Validators.required],
      image: ['', Validators.required],
    });

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    try {
      this.exercises.recordCreate(payload)
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
  goToDetail(record: any): void {
    this.router.navigate(['exercise/detail']);
  }

  goToEdit(record: any): void {
    this.router.navigate(['exercise/edit']);
  }

  goBack() {
    window.history.back();
  }

}
