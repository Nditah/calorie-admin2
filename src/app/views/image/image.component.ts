import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PNotifyService } from '../../services';
import { Image, ApiResponse } from '../../models';
import { Images } from '../../providers';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  page = 'List of Images';
  response: ApiResponse;
  records: Array<any>;
  notify: any;
  loading = false;

  constructor(private router: Router,
    private pNotifyService: PNotifyService,
    public images: Images) {
      this.records = this.images.query();
    }

    ngOnInit() {
      this.notify = this.pNotifyService.getPNotify();
      this.toast('getting saved information', 'custominfo');
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
      this.router.navigate(['image/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`image/detail${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`image/edit/${record.id}`]);
    }

    toast (message: any, messageclass: string) {
      this.notify.alert({
        text: message,
        addClass: messageclass
      });
    }

  }
