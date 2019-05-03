import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse } from '../../../models';
import { Images, Users } from '../../../providers';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit {

  selectedFile: ImageSnippet;

  page = 'Add New Image Record';
  addForm: FormGroup;
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pNotifyService: PNotifyService,
    public imageService: Images) {
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
}

  processFile(imageInput: any) {
    const name = this.addForm.value.name;

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      this.imageService.recordCreate(this.selectedFile.file, name)
        .then((res: any) => {
          console.log(res);
          if (res.success) {
            this.goToDetail(res.payload);
          } else {
            this.toast(res.message, 'customerror');
          }
        })
        .catch (error => {
            this.toast(error.message, 'customerror');
          });
    });

    reader.readAsDataURL(file);
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.loading = false;
      this.toast('this.addForm.invalid', 'customerror');
      return;
    }
    this.imageService.recordCreate(payload, '')
      .then((res: any) => {
          console.log(res);
        if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.toast(res.message, 'customerror');
        }
      })
      .catch (error => {
          this.toast(error.message, 'customerror');
        });
      return;
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`image/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`image/edit/${record.id}`]);
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
