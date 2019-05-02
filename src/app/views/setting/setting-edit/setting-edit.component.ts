import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings } from '../../../providers';
import { Setting, ApiResponse } from '../../../models';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
})
export class SettingEditComponent implements OnInit {

  page = 'Edit Setting Record';
  editForm: FormGroup;
  records: Array<Setting>;
  record: Setting;
  date: any;

  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public settings: Settings) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.record = this.settings.query({ id })[0];
     }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      access: [null, Validators.required], // ["public", "private"]
      value: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('description').setValue(this.record.description || '');
    this.editForm.get('access').setValue(this.record.access || '');
    this.editForm.get('value').setValue(this.record.value || '');
    this.editForm.get('category').setValue(this.record.category || '');
  }

  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    try {
      this.settings.recordUpdate(this.record, payload)
      .subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success && res.payload.length > 0) {
        console.log('Operation was successfull!');
      } else {
        console.log(res.message);
      }
    }, (err) => console.log(err.message));
      } catch (err) {
        console.log(err.message);
      }
      this.goBack();
      return;
  }

  goToAdd(): void {
    this.router.navigate(['setting/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`setting/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
