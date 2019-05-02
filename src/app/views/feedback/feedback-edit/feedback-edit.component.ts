import { Feedback } from '../../../models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import {ApiResponse, SelectOption} from '../../../models';


@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
})
export class FeedbackEditComponent implements OnInit {

  page = 'Edit Feedback Record';
  editForm: FormGroup;
  records: Array<Feedback>;
  record: Feedback;
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
    const recordId = this.utilsService.getLocalStorage('feedbackEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      user: [''],
      message: [''],
      status: [''],
    });

    this.editForm.get('user').setValue(this.record.user || '');
    this.editForm.get('message').setValue(this.record.message || '');
    this.editForm.get('status').setValue(this.record.status || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('feedbacks');
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
    return this.crudService.put(GetRoutes.Feedbacks + '/' + this.record.id, payload)
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
    return this.crudService.getAuth(GetRoutes.Feedbacks, true)
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
    this.router.navigate(['feedback/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('feedbackDetailId', record.id, null);
    this.router.navigate(['feedback/detail']);
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
