import { Log } from '../../../_models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';


@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
})
export class LogEditComponent implements OnInit {

  page = 'Edit Log Record';
  editForm: FormGroup;
  records: Array<Log>;
  record: Log;
  date: any;

  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  exercises: SelectOptionInterface[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('logEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      day: [''],
      food: [''],
      food_quantity: [''],
      exercise: [''],
      exercise_duration: [''],
      remark: [''],
    });

    this.editForm.get('day').setValue(this.record.day || '');
    this.editForm.get('food').setValue(this.record.food || '');
    // this.editForm.get('food_quantity').setValue(this.record.food_quantity || '');
    this.editForm.get('exercise').setValue(this.record.exercise || '');
    // this.editForm.get('exercise_duration').setValue(this.record.exercise_duration || '');
    this.editForm.get('remark').setValue(this.record.remark || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('logs');
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
    return this.crudService.put(GetRoutes.Logs + '/' + this.record.id, payload)
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
    return this.crudService.getAuth(GetRoutes.Logs, true)
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
  
  getExercises() {
    const storedRecords = this.utilsService.getLocalStorage('exercises') || [];
    if (storedRecords.length > 0) {
      this.exercises = storedRecords.map(item => ({ id: item.id, text: item.name }));
      console.log(this.exercises);
      return;
    }
    return this.crudService.getAuth(GetRoutes.Exercises, true)
      .then((data: ApiResponse) => {
        if (data.success && data.payload.length > 0) {
          this.exercises = data.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.exercises);
          return;
        }
      });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['log/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('logDetailId', record.id, null);
    this.router.navigate(['log/detail']);
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
