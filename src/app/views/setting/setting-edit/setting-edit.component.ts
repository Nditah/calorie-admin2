import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings } from '../../../providers';
import { Setting } from '../../../models';
import { PNotifyService  } from '../../../services';


@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
})
export class SettingEditComponent implements OnInit {

  page = 'Edit Setting Record';
  editForm: FormGroup;
  records: Array<Setting>;
  record: Setting;
  date: any;

  loading = false;
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public settings: Settings,
    private pNotifyService: PNotifyService) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.settings.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
     }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      access: [null, Validators.required], // ["public", "private"]
      value: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('description').setValue(this.record.description || '');
    this.editForm.get('access').setValue(this.record.access || '');
    this.editForm.get('value').setValue(this.record.value || '');
    this.editForm.get('category').setValue(this.record.category || '');
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.settings.recordUpdate(this.record, payload)
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

  goToDetail(record: any): void {
    this.router.navigate([`setting/detail/${record.id}`]);
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
