import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';


@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
})
export class ExerciseAddComponent implements OnInit {

  page = 'Add New Exercise';
  addForm: FormGroup;
  foods: SelectOptionInterface[];
  users: SelectOptionInterface[];

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

    this.addForm = this.formBuilder.group({
      type: [null, Validators.required], // ["DEFAULT", "CUSTOM"]
      category: [null, Validators.required], // ["SPORT", "WORKOUT"]
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
    console.log(payload);
    return this.crudService.post(GetRoutes.Exercises, payload)
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
    return this.crudService.getAuth(GetRoutes.Exercises, true)
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
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('exerciseDetailId', record.id, null);
    this.router.navigate(['exercise/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('exerciseEditId', record.id, null);
    this.router.navigate(['exercise/edit']);
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
