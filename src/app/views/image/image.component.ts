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
      if (confirm('Are you sure you want to delete this record')) {
        try {
              this.images.recordDelete(record).subscribe((res: ApiResponse) => {
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
