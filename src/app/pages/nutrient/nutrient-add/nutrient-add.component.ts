import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, SelectOption } from '../../../models';
import { Nutrients, Foods } from '../../../providers';
import { ToastrService } from 'ngx-toastr';

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
              private toastr: ToastrService,
              public nutrients: Nutrients,
              public foods: Foods) {
      this.getFoods();
    }

  ngOnInit() {
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
      image: [''],
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
      this.showNotification(this.addForm.errors);
      return;
    }
    try {
      this.nutrients.recordCreate(payload)
        .then((res: any) => {
          console.log(res);
          if (res.success) {
            this.goToDetail(res.payload);
          } else {
            this.showNotification(res.message);
          }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
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

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }
}
