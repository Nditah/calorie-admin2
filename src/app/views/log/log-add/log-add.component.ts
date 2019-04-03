import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
})
export class LogAddComponent implements OnInit {

  page = 'Add New Log Record';
  addForm: FormGroup;
  exercises: SelectOptionInterface[];
  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.getExercises();

    this.addForm = this.formBuilder.group({
      day: [null, Validators.required],
      food: [null, Validators.required],
      food_quantity: [null, Validators.required],
      exercise: [null, Validators.required],
      exercise_duration: [null, Validators.required],
      remark: [null, Validators.required],
    });

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    return this.crudService.post(GetRoutes.Logs, payload)
      .then((data: ApiResponse) => {
        this.response = data;
        if (this.response.success) {
          this.loading = false;
          this.reset();
          this.toast('Record added successfully', 'customsuccess');
          this.recordRetrieve();
          this.goToDetail(this.response.payload[0]);
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
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('logDetailId', record.id, null);
    this.router.navigate(['log/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('logEditId', record.id, null);
    this.router.navigate(['log/edit']);
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




