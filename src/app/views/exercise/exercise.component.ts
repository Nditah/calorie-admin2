import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { Exercise, ApiResponse } from '../../models';
import { Exercises } from '../../providers';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  page = 'List of Exercises';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public exercises: Exercises) {
      this.records = this.exercises.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
    }


    recordDelete(record: Exercise): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.exercises.recordDelete(record).then((res: any) => {
          console.log(res);
          if (res.success) {
            this.toast('Operation was successfull!', 'custominfo');
          } else {
            this.toast(res.message, 'customerror');
          }
          }).catch(error => {
              this.toast(error.message, 'customerror');
          });
      }
      this.loading = false;
      return;
    }

    goToAdd(): void {
      this.router.navigate(['exercise/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`exercise/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`exercise/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
