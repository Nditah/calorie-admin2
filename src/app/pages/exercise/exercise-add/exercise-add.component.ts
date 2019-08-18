import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../models';
import { Exercises } from '../../../providers';
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService,) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // ["DEFAULT", "CUSTOM"]
      category: ['', Validators.required], // ["SPORT", "WORKOUT"]
      name: ['', Validators.required],
      description: ['', Validators.required],
      calorie_rate: ['', Validators.required],
      image: [''],
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
      this.showNotification('this.addForm.invalid');
      return;
    }
    try {
      this.exercises.recordCreate(payload)
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
