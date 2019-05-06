import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse } from '../../../models';
import { Images } from '../../../providers';
import { ApiService } from '../../../services';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit {

  selectedFile: File;

  page = 'Add New Image Record';
  addForm: FormGroup;
  notify: any;
  loading = false;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private pNotifyService: PNotifyService,
    public apiService: ApiService) {
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  reset() {
    this.addForm.reset();
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const name = this.addForm.value.name;
      if (!name) {
        const filename = this.selectedFile.name || 'calorie image';
        this.addForm.get('name').setValue(filename);
      }
      this.addForm.get('image').setValue(this.selectedFile);
    }
  }

  async onSubmit() {
    this.loading = true;
    const name = this.addForm.value.name;
    const image = this.addForm.value.image;
    if (!name) {
      this.loading = false;
      this.toast('Invalid submission! Enter image name', 'customerror');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.forEach(k => console.log(k));

    this.http.post('http://localhost:5000/api/images', formData).subscribe(
      (res) => { console.log(res); },
      (err) => { console.log(err); },
    );
    
  }

  goToDetail(record: any): void {
    this.router.navigate([`image/detail/${record.id}`]);
    return;
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
