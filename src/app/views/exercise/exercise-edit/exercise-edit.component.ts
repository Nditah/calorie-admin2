import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercises } from '../../../providers';
import { Exercise, ApiResponse } from '../../../models';


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
})
export class ExerciseEditComponent implements OnInit {

  page = 'Edit Exercise Record';
  editForm: FormGroup;
  records: Array<Exercise>;
  record: Exercise;
  date: any;

  loading = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public exercises: Exercises) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.exercises.query({ id })[0];
      this.record = record || exercises.defaultRecord;
      console.log(record);
     }

  ngOnInit() {
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      type: [''], // ["DEFAULT", "CUSTOM"]
      category: [''], // enum: ["SPORT", "WORKOUT"]
      name: [''],
      description: [''],
      calorie_rate: [''],
      image: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('calorie_rate').setValue(this.record.calorie_rate || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('description').setValue(this.record.description || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    try {
      this.exercises.recordUpdate(this.record, payload)
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

  goToAdd(): void {
    this.router.navigate(['exercise/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`exercise/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
