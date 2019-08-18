import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image, ApiResponse } from '../../models';
import { Images } from '../../providers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  page = 'List of Images';
  response: ApiResponse;
  currentRecords: Array<any>;
  loading = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              public images: Images) {
      this.currentRecords = this.images.query();
    }

    ngOnInit() {
    }


    recordDelete(record: Image): void {
      if (this.loading) {
        return;
      }
      if (confirm('Are you sure you want to delete this record')) {
        this.loading = true;
        this.images.recordDelete(record).then((res: any) => {
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
      this.router.navigate(['image/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`image/detail${record.id}`]);
      return;
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
