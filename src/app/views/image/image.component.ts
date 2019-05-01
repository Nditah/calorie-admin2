import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../services';
import { Router } from '@angular/router';
import { Image, ApiResponse } from '../../models';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {

  page = 'List of Images';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Image>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('images');
    if (storedRecords) {
        this.records = storedRecords;
        this.toast('getting saved information', 'custominfo');
        this.success = true;
    } else {
      this.recordRetrieve();
    }
  }

  recordRetrieve() {
    this.loading = true;
    return this.crudService.getAuth(GetRoutes.Images, true)
      .then((response: ApiResponse) => {
        this.message = response.message;
        this.loading = false;
        if (response.success) {
          this.records = response.payload;
          this.success = response.success;
        } else {
          this.toast(response.message, 'customerror');
        }
      }).catch( err => {
        this.loading = false;
        this.toast(err.message, 'customerror');
      });
  }

  recordDelete(record: Image): void {
    if (confirm('Are you sure you want to delete this record')) {
      this.crudService.delete(GetRoutes.Images + '/' + record.id)
        .then((data: ApiResponse) => {
          if (data.success) {
            this.records = this.records.filter(i => i.id !== record.id);
            this.utilsService.setLocalStorage('images', (this.records), null);
          } else {
            this.toast(data.message, 'customdanger');
          }
        }).catch(error => {
          this.toast(error, 'customdanger');
        });
    }
    return;
  }

// Navigation
  goToAdd(): void {
    this.router.navigate(['image/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('imageDetailId', record.id, null);
    this.router.navigate(['image/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('imageEditId', record.id, null);
    this.router.navigate(['image/edit']);
  }

  // toast notification
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
