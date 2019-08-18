import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercises } from '../../../providers';
import { Exercise } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { deepPropsExist } from 'src/app/helpers';


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
    public exercises: Exercises,
    private toastr: ToastrService,) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.exercises.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
  }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      type: [''], // ["DEFAULT", "CUSTOM"]
      category: [''], // enum: ["SPORT", "WORKOUT"]
      name: [''],
      description: [''],
      calorie_rate: [''],
      image: [''],
    });

    this.editForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      category: deepPropsExist(this.record, 'category') ? this.record.category : '',
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      calorie_rate: deepPropsExist(this.record, 'calorie_rate') ? this.record.calorie_rate : '',
      image: deepPropsExist(this.record, 'image') ? this.record.image : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : ''
    });

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
          this.showNotification(res.message);
        }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
        this.showNotification(error.message);
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
