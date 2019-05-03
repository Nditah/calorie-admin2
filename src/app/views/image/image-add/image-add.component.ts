import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse } from '../../../models';
import { Images, Users } from '../../../providers';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
})
export class ImageAddComponent implements OnInit {

  page = 'Add New Image Record';
  addForm: FormGroup;
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pNotifyService: PNotifyService,
    public images: Images) {
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
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
      this.images.recordCreate(payload)
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

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`image/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`image/edit/${record.id}`]);
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
