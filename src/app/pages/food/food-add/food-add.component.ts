import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption, Nutrient } from '../../../models';
import { Foods, Nutrients } from '../../../providers';
import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
})
export class FoodAddComponent implements OnInit {

  page = 'Add New Food';
  addForm: FormGroup;
  nutrientRecords: Array<Nutrient>;
  prevNutrientsRecord: Array<Nutrient>;
  nutrientOptions: SelectOption[];
  loading = false;
  notify: any;
  selectNutrient: Array<any>;
  multiInputData: Array<SelectOption> = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public foods: Foods,
              public nutrients: Nutrients,
              private toastr: ToastrService,
              ) {
                this.nutrientRecords = this.nutrients.query();
              }

  ngOnInit() {
    console.log('Intialized ============= ');
    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // enum: ["DEFAULT", "CUSTOM"]
      category: ['', Validators.required], // enum: ["FOOD", "DRINK"]
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      water: [''],
      calories: [''],
      carbohydrate: [''],
      protein: [''],
      fats: [''],
      fibre: [''],
      ph: [''],
      image: [''],
      nutrients: [''],
    });
  }

  ngDoCheck() {
    console.log('Checking ============= !!!!!!!! ');
    if (!isEqual(this.nutrientRecords, this.prevNutrientsRecord)) {
      this.prevNutrientsRecord = [...this.nutrientRecords];
      this.getNutrientOptions();
    }
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    payload.nutrients = this.selectNutrient;
    if (this.addForm.invalid) {
      this.loading = false;
      this.showNotification('Please fill out the form correctly');
      return;
    }
    try {
      console.log(payload);
      this.foods.recordCreate(payload)
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

  goToDetail(record: any): void {
    this.router.navigate([`food/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`food/edit/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

  getNutrientOptions() {
    this.nutrientOptions =  this.nutrientRecords.map( items => (
      {
        id: items.id,
        text: items.name,
        code: 0
      }
    ));
  }

  getMultipleRecords(event: SelectOption[]) {
    this.selectNutrient = event.map(option => ({
      nutrient: option.id,
      quantity: option.code,
    }));

    console.log(this.selectNutrient);
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
