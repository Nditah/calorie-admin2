import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService, GetRoutes, PNotifyService, UtilsService} from '../../../_services';
import {ApiResponse, SelectOptionInterface} from '../../../_models';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
})
export class ImageAddComponent implements OnInit {

  page = 'Add New Image Record';
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

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });

  }
  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    return this.crudService.post(GetRoutes.Images, payload)
      .then((response: ApiResponse) => {
        this.loading = false;
        this.response = response;
        if (response.success) {
          this.reset();
          this.toast('Record added successfully', 'customsuccess');
          this.recordRetrieve();
          this.goToDetail(this.response.payload[0]);
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
    return this.crudService.getAuth(GetRoutes.Images, true)
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
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('imageDetailId', record.id, null);
    this.router.navigate(['image/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('imageEditId', record.id, null);
    this.router.navigate(['image/edit']);
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




