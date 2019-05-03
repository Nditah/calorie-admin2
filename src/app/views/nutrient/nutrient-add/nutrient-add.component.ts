import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PNotifyService } from '../../../services';
import { ApiResponse, SelectOption } from '../../../models';
import { Nutrients, Foods } from '../../../providers';

@Component({
  selector: 'app-nutrient-add',
  templateUrl: './nutrient-add.component.html',
})
export class NutrientAddComponent implements OnInit {

  page = 'Add New Nutrient';
  addForm: FormGroup;
  foodOptions: SelectOption[];
  notify: any;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pNotifyService: PNotifyService,
    public nutrients: Nutrients,
    public foods: Foods) {
      this.getFoods();
    }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();
    this.getFoods();

    this.addForm = this.formBuilder.group({
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
    try {
      this.nutrients.recordCreate(payload)
        .then((res: any) => {
          console.log(res);
        if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.toast(res.message, 'customerror');
        }
      }, (err) => this.toast(err.message, 'customerror'));
    } catch (error) {
      this.toast(error.message, 'customerror');
    }
      return;
  }

  getFoods() {
    const foodArray = this.foods.query();
    this.foodOptions = foodArray.map(item => (
      { id: item.id, text: item.name }));
      console.log(foodArray);
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`nutrient/detail/${record.id}`]);
    return;
  }
  goToEdit(record: any): void {
    this.router.navigate([`nutrient/edit/${record.id}`]);
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
