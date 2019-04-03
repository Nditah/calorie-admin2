import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
})
export class FoodAddComponent implements OnInit {

  page = 'Add New Food Record';
  addForm: FormGroup;
  banks: SelectOptionInterface[];
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
    this.getBanks();

    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // enum: ["DEFAULT", "CUSTOM"]
      category: ['', Validators.required], // enum: ["FOOD", "DRINK"]
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      water: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      protein: ['', Validators.required],
      fat: ['', Validators.required],
      fiber: ['', Validators.required],
      vitamins: ['', Validators.required],
      minerals: ['', Validators.required],
    });

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    delete payload.confirm_password;
    console.log(payload);
    return this.crudService.post(GetRoutes.Foods, payload)
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
    return this.crudService.getAuth(GetRoutes.Foods, true)
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

  getBanks() {
    const storedRecords = this.utilsService.getLocalStorage('banks') || [];
    if (storedRecords.length > 0) {
      this.banks = storedRecords.map(item => ({ id: item.id, text: item.name }));
      console.log(this.banks);
      return;
    }
    return this.crudService.getAuth(GetRoutes.Banks, true)
      .then((data: ApiResponse) => {
        if (data.success && data.payload.length > 0) {
          this.banks = data.payload.map(item => ({ id: item.id, text: item.name }));
          console.log(this.banks);
          return;
        }
      });
  }

  // Navigation
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('foodDetailId', record.id, null);
    this.router.navigate(['food/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('foodEditId', record.id, null);
    this.router.navigate(['food/edit']);
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




