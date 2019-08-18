import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  currentRecords: Array<Exercise>;
  notify: any;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public exercises: Exercises) {
      this.currentRecords = this.exercises.query();
    }

    ngOnInit() {
      // this.showNotification('getting saved information');
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
            this.showNotification('Operation was successfull!');
          } else {
            this.showNotification(res.message);
          }
          }).catch(error => {
              this.showNotification(error.message);
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

    showNotification(message) {
      this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-primary alert-with-icon',
        });
      }

  }
