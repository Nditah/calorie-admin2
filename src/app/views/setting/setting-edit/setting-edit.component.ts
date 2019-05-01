import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService, CrudService, GetRoutes, PNotifyService } from '../../../services';
import { ApiResponse, Setting } from '../../../models';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
})
export class SettingEditComponent implements OnInit {

  editForm: FormGroup;
  records: Array<Setting>;
  record: Setting;
  response: ApiResponse;
  loading = false;
  success = false;
  message = '';
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('settingEditId');
    if (!recordId) {
      this.toast('Invalid Action', 'customdanger');
      this.router.navigate(['setting']);
      return;
    }
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      access: [null, Validators.required], // ["public", "private"]
      value: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.record = this.utilsService.cleanObject(this.getRecord(recordId));

    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('description').setValue(this.record.description || '');
    this.editForm.get('access').setValue(this.record.access || '');
    this.editForm.get('value').setValue(this.record.value || '');
    this.editForm.get('category').setValue(this.record.category || '');
  }

  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('settings');
    if (storedRecords) {
      this.records = storedRecords;
      this.success = true;
    }
    return this.utilsService.getObjectByKey(this.records, 'id', recordId);
  }

  onSubmit() {
    const payload = this.editForm.value;
    delete payload.name;
    delete payload.category;
    return this.crudService.put(GetRoutes.Settings + '/' + this.record.id, payload)
      .then((data: ApiResponse) => {
        this.response = data;
        this.record = this.response.payload;
        if (this.response.success) {
          this.loading = false;
          this.toast('Record Updated Successfully', 'customsuccess');
          this.utilsService.deleteObjectByKey(this.records, 'id', this.record.id);
          this.records.unshift(this.record);
          this.utilsService.setLocalStorage('settings', this.records, null);
          this.goBack();
        } else {
          this.loading = false;
          this.toast(this.response.message, 'customdanger');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err, 'customdanger');
      });
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
