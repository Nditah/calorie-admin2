
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService, CrudService, GetRoutes, UtilsService } from '../../../_services';
import { Exercise, User } from '../../../_models';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
})
export class ExerciseDetailComponent implements OnInit {

  records: Array<Exercise>;
  record: Exercise;

  response: any;
  success = false;
  message = '';
  notify: any;
  loading = false;

  constructor( private router: Router,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    const recordId = this.utilsService.getLocalStorage('exerciseDetailId');
    if (!recordId) {
      this.toast('Invalid record Id', 'customerror');
      this.goBack();
      return;
    }
    this.record = this.utilsService.cleanObject(this.getRecord(recordId));
    console.log('\n record Name', typeof this.record, JSON.stringify(this.record));
  }

  getRecord(recordId) {
    console.log('\n record Id ', recordId);
    const storedRecords = this.utilsService.getLocalStorage('exercises');
    if (storedRecords) {
        this.records = storedRecords;
        this.success = true;
    }
    return this.utilsService.getObjectByKey(this.records, 'id', recordId);
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['exercise/add']);
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
