
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image, ApiResponse } from '../../../models';
import { Images } from '../../../providers';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
})
export class ImageDetailComponent implements OnInit {

  records: Array<Image>;
  record: Image;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public images: Images) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.images.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record || this.images.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['image/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`image/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
