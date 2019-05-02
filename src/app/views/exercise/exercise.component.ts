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
      if (confirm('Are you sure you want to delete this record')) {
        try {
              this.exercises.recordDelete(record).subscribe((res: ApiResponse) => {
                console.log(res);
              if (res.success && res.payload.length > 0) {
                console.log('Operation was successfull!');
              } else {
                console.log(res.message);
              }
            }, (err) => console.log(err.message));
          } catch (error) {
            console.log(error.message);
          }
      }
      return;
    }

    goToAdd(): void {
      this.router.navigate(['exercise/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`exercise/detail${record.id}`]);
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
