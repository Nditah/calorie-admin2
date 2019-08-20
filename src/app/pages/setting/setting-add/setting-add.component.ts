import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings } from '../../../providers';
import { Setting } from '../../../models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-setting-add',
  templateUrl: './setting-add.component.html',
})
export class SettingAddComponent implements OnInit {

  page = 'Edit Setting Record';
  addForm: FormGroup;
  records: Array<Setting>;
  record: Setting;
  date: any;

  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public settings: Settings,
    ) {
     }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      access: [null, Validators.required], // ["public", "private"]
      value: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  reset() {
    this.addForm.reset();
  }


  onSubmit() {
    const payload = this.addForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.settings.recordUpdate(this.record, payload)
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

  goToDetail(record: any): void {
    this.router.navigate([`setting/detail/${record.id}`]);
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
