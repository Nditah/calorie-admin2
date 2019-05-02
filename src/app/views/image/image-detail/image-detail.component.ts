
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../../models';
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
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.images.query({ id })[0];
      this.record = record || images.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
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
