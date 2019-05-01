import { Exercise } from '../../../models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService, DataService } from '../../../services';
import {ApiResponse, SelectOptionInterface} from '../../../models';


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
})
export class ExerciseEditComponent implements OnInit {

  page = 'Edit Exercise Record';
  editForm: FormGroup;
  records: Array<Exercise>;
  record: Exercise;
  date: any;

  success = false;
  message = '';
  notify: any;
  loading = false;

  counties: SelectOptionInterface[];
  activeCountry: SelectOptionInterface[];
  banks: SelectOptionInterface[];
  activeState: SelectOptionInterface[];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('exerciseEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      type: [''], // ["DEFAULT", "CUSTOM"]
      category: [''], // enum: ["SPORT", "WORKOUT"]
      name: [''],
      description: [''],
      calorie_rate: [''],
      image: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('calorie_rate').setValue(this.record.calorie_rate || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('description').setValue(this.record.description || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('exercises');
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
    return this.crudService.put(GetRoutes.Exercises + '/' + this.record.id, payload)
      .then((data: ApiResponse) => {
        console.log('editForm response ', data);
        if (data.success) {
          this.loading = false;
          this.toast('Record updated successfully', 'customsuccess');
          this.goBack();
        } else {
          this.loading = false;
          this.toast(data.message, 'customdanger');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err, 'customdanger');
      });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['exercise/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('exerciseDetailId', record.id, null);
    this.router.navigate(['exercise/detail']);
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
