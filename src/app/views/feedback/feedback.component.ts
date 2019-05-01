import { Component, OnInit } from '@angular/core';
import { CrudService, GetRoutes, UtilsService, PNotifyService } from '../../services';
import { Router } from '@angular/router';
import { Feedback, ApiResponse } from '../../models';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {

  page = 'List of Feedbacks';
  response: ApiResponse;
  success = false;
  message = '';
  records: Array<Feedback>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const storedRecords = this.utilsService.getLocalStorage('feedbacks');
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
    return this.crudService.getAuth(GetRoutes.Feedbacks, true)
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

  recordDelete(record: Feedback): void {
    if (confirm('Are you sure you want to delete this record')) {
      this.crudService.delete(GetRoutes.Feedbacks + '/' + record.id)
        .then((data: ApiResponse) => {
          if (data.success) {
            this.records = this.records.filter(i => i.id !== record.id);
            this.utilsService.setLocalStorage('feedbacks', (this.records), null);
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
    this.router.navigate(['feedback/add']);
  }
  goToDetail(record: any): void {
    this.utilsService.setLocalStorage('feedbackDetailId', record.id, null);
    this.router.navigate(['feedback/detail']);
    return;
  }
  goToEdit(record: any): void {
    this.utilsService.setLocalStorage('feedbackEditId', record.id, null);
    this.router.navigate(['feedback/edit']);
  }

  // toast feedback
  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }
}
