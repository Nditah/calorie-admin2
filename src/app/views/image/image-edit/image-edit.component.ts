import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import {ApiResponse, SelectOption, Image } from '../../../models';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
})
export class ImageEditComponent implements OnInit {

  page = 'Edit Image Record';
  editForm: FormGroup;
  records: Array<Image>;
  record: Image;
  date: any;

  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  counties: SelectOption[];
  activeCountry: SelectOption[];
  banks: SelectOption[];
  activeState: SelectOption[];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('imageEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      name: [''],
      url: [''],
    });

    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('url').setValue(this.record.url || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('images');
    if (storedRecords) {
        this.records = storedRecords;
    }
    const t = this.utilsService.getObjectByKey(this.records, 'id', recordId);
      return t;
  }


  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    console.log('editForm payload ', payload);

    return this.crudService.put(GetRoutes.Images + '/' + this.record.id, payload)
      .then((data: ApiResponse) => {
        this.response = data;
        this.record = this.response.payload;
        if (this.response.success) {
          this.loading = false;
          this.toast('Record updated successfully', 'customsuccess');
          this.recordRetrieve();
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

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Images, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        if (response.success && response.payload.length > 0 ) {
          this.loading = false;
          // this.records = response.payload;
          this.success = response.success;
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['image/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('imageDetailId', record.id, null);
    this.router.navigate(['image/detail']);
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
