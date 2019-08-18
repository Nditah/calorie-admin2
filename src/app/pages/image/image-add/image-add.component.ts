import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models';
import { Images } from '../../../providers';
import { ApiService } from '../../../services';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit {

  selectedFile: File;

  page = 'Add New Image Record';
  addForm: FormGroup;
  loading = false;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              public apiService: ApiService) {
    }

  ngOnInit() {

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
      this.showNotification('Invalid submission! Enter image name');
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }
}
