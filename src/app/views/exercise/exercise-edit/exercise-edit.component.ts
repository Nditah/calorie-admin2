import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercises } from '../../../providers';
import { Exercise } from '../../../models';
import { PNotifyService  } from '../../../services';


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
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public exercises: Exercises,
    private pNotifyService: PNotifyService) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.exercises.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
  }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

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

    // console.log('\nrecord ', typeof this.record, this.record);
  }

  reset() {
    this.editForm.reset();
  }

  onSubmit() {
    const payload = this.editForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.exercises.recordUpdate(this.record, payload)
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

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
