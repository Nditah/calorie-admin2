import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../models';
import { Exercises } from '../../../providers';
import { PNotifyService  } from '../../../services';


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
})
export class ExerciseAddComponent implements OnInit {

  page = 'Add New Exercise';
  addForm: FormGroup;
  loading = false;
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public exercises: Exercises,
    private pNotifyService: PNotifyService) {}

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

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
    if (this.addForm.invalid) {
      this.loading = false;
      this.toast('this.addForm.invalid', 'customerror');
      return;
    }
    try {
      this.exercises.recordCreate(payload)
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

  goToDetail(record: any): void {
    this.router.navigate([`exercise/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`exercise/edit/${record.id}`]);
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
