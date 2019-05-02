import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrients, Foods } from '../../../providers';
import { Nutrient, ApiResponse, SelectOption } from '../../../models';
import { PNotifyService } from '../../../services';

@Component({
  selector: 'app-nutrient-edit',
  templateUrl: './nutrient-edit.component.html',
})
export class NutrientEditComponent implements OnInit {

  page = 'Edit Nutrient Record';
  editForm: FormGroup;
  records: Array<Nutrient>;
  record: Nutrient;
  date: any;

  notify: any;
  loading = false;

  foodOptions: SelectOption[];

  constructor(private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private pNotifyService: PNotifyService,
      public nutrients: Nutrients,
      public foods: Foods) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const record = this.nutrients.query({ id })[0];
        this.record = record || nutrients.defaultRecord;
        console.log(record);
      }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.getFoods();
    // console.log('records ' + this.record);

    this.editForm = this.formBuilder.group({
      type: ['', Validators.required],
      category: ['', Validators.required],
      symbol: ['', Validators.required],
      name: ['', Validators.required],
      classification: ['', Validators.required],
      source: ['', Validators.required],
      use: ['', Validators.required],
      description: ['', Validators.required],
      deficiency: ['', Validators.required],
      excess: ['', Validators.required],
      ear: ['', Validators.required],
      limit: ['', Validators.required],
      rda_male: ['', Validators.required],
      rda_female: ['', Validators.required],
      unit: ['', Validators.required],
      image: ['', Validators.required],
      foods: [''],
    });

    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('symbol').setValue(this.record.symbol || '');
    this.editForm.get('classification').setValue(this.record.classification || '');
    this.editForm.get('source').setValue(this.record.source || '');
    this.editForm.get('use').setValue(this.record.use || '');
    this.editForm.get('description').setValue(this.record.description || '');
    this.editForm.get('deficiency').setValue(this.record.deficiency || '');
    this.editForm.get('excess').setValue(this.record.excess || '');
    this.editForm.get('ear').setValue(this.record.ear.toString() || '');
    this.editForm.get('limit').setValue(this.record.limit.toString() || '');
    this.editForm.get('rda_male').setValue(this.record.rda_male.toString() || '');
    this.editForm.get('rda_female').setValue(this.record.rda_female.toString() || '');
    this.editForm.get('unit').setValue(this.record.unit || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('foods').setValue(this.record.foods || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    this.loading = true;
    try {
      this.nutrients.recordUpdate(this.record, payload)
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

  // Navigation
  goToAdd(): void {
    this.router.navigate(['nutrient/add']);
  }
  goToDetail(record: any): void {
    this.router.navigate([`nutrient/detail/${record.id}`]);
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

  getFoods() {
    const userArray = this.foods.query();
    this.foodOptions = userArray.map(item => (
      { id: item.id, text: item.type + ' ' + item.name }));
      console.log(this.foodOptions);
  }

}
