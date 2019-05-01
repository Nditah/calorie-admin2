import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../services';
import {ApiResponse, SelectOptionInterface} from '../../../models';


@Component({
  selector: 'app-nutrient-add',
  templateUrl: './nutrient-add.component.html',
})
export class NutrientAddComponent implements OnInit {

  page = 'Add New Nutrient';
  addForm: FormGroup;
  foodOptions: SelectOptionInterface[];
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
    this.getFoods();

    this.addForm = this.formBuilder.group({
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

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    return this.crudService.post(GetRoutes.Nutrients, payload)
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
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('nutrientDetailId', record.id, null);
    this.router.navigate(['nutrient/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('nutrientEditId', record.id, null);
    this.router.navigate(['nutrient/edit']);
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
