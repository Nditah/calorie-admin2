import { Food } from '../../../models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import {ApiResponse, SelectOption} from '../../../models';


@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
})
export class FoodEditComponent implements OnInit {

  page = 'Edit Food Record';
  editForm: FormGroup;
  records: Array<Food>;
  record: Food;
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
    const recordId = this.utilsService.getLocalStorage('foodEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      type: [''], // enum: ["DEFAULT", "CUSTOM"]
      category: [''], // enum: ["FOOD", "DRINK"]
      name: [''],
      description: [''],
      quantity: [''],
      water: [''],
      calories: [''],
      carbohydrate: [''],
      protein: [''],
      fats: [''],
      fibre: [''],
      ph: [''],
      image: [''],
      nutrients: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('quantity').setValue(this.record.quantity || '');
    this.editForm.get('water').setValue(this.record.water || '');
    this.editForm.get('calories').setValue(this.record.calories || '');
    this.editForm.get('carbohydrate').setValue(this.record.carbohydrate || '');
    this.editForm.get('protein').setValue(this.record.protein || '');
    this.editForm.get('fats').setValue(this.record.fats || '');
    this.editForm.get('fibre').setValue(this.record.fibre || '');
    this.editForm.get('ph').setValue(this.record.ph || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('nutrients').setValue(this.record.nutrients || '');
    this.editForm.get('description').setValue(this.record.description || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('foods');
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
    return this.crudService.put(GetRoutes.Foods + '/' + this.record.id, payload)
      .then((response: ApiResponse) => {
        this.record = response.payload;
        this.loading = false;
        if (response.success) {
          this.toast('Record updated successfully', 'customsuccess');
          this.recordRetrieve();
          this.goBack();
        } else {
          this.toast(response.message, 'customdanger');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err, 'customdanger');
      });
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Foods, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        this.loading = false;
        if (response.success) {
          // this.records = response.payload;
          this.success = response.success;
        } else {
          this.toast(response.message, 'customdanger');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['food/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('foodDetailId', record.id, null);
    this.router.navigate(['food/detail']);
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
