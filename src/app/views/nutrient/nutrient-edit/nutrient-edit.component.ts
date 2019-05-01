import { Nutrient } from '../../../models';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../services';
import {ApiResponse, SelectOptionInterface} from '../../../models';


@Component({
  selector: 'app-nutrient-edit',
  templateUrl: './nutrient-edit.component.html',
})
export class NutrientEditComponent implements OnInit {

  page = 'Edit Nutrient Record';
  editForm: FormGroup;
  records: Array<Nutrient>;
  record: Nutrient;
  date: any;

  response: ApiResponse;
  success = false;
  message = '';
  notify: any;
  loading = false;

  foodOptions: SelectOptionInterface[];
  activeCountry: SelectOptionInterface[];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('nutrientEditId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.getFoods();

    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      type: ['', Validators.required],
      category: ['', Validators.required],
      symbol: ['', Validators.required],
      name: ['', Validators.required],
      classification: ['', Validators.required],
      source: ['', Validators.required],
      use: ['', Validators.required],
      description: ['', Validators.required],
      deficiency: ['', Validators.required],
      excess: ['', Validators.required],
      ear: ['', Validators.required],
      limit: ['', Validators.required],
      rda_male: ['', Validators.required],
      rda_female: ['', Validators.required],
      unit: ['', Validators.required],
      image: ['', Validators.required],
      foods: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('symbol').setValue(this.record.symbol || '');
    this.editForm.get('classification').setValue(this.record.classification || '');
    this.editForm.get('source').setValue(this.record.source || '');
    this.editForm.get('use').setValue(this.record.use || '');
    this.editForm.get('description').setValue(this.record.description || '');
    this.editForm.get('deficiency').setValue(this.record.deficiency || '');
    this.editForm.get('excess').setValue(this.record.excess || '');
    this.editForm.get('ear').setValue(this.record.ear.toString() || '');
    this.editForm.get('limit').setValue(this.record.limit.toString() || '');
    this.editForm.get('rda_male').setValue(this.record.rda_male.toString() || '');
    this.editForm.get('rda_female').setValue(this.record.rda_female.toString() || '');
    this.editForm.get('unit').setValue(this.record.unit || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('foods').setValue(this.record.foods || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  // new get record
  getRecord(recordId) {
    const storedRecords = this.utilsService.getLocalStorage('nutrients');
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
    return this.crudService.put(GetRoutes.Nutrients + '/' + this.record.id, payload)
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
    return this.crudService.getAuth(GetRoutes.Nutrients, true)
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
    this.router.navigate(['nutrient/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('nutrientDetailId', record.id, null);
    this.router.navigate(['nutrient/detail']);
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

  getFoods() {
    return this.crudService.getAuth(GetRoutes.Foods, true)
      .then((data: ApiResponse) => {
        if (data.success && data.payload.length > 0) {
          this.foodOptions = data.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.foodOptions);
          return;
        }
      });
  }
}
