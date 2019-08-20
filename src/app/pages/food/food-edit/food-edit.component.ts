import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foods, Nutrients } from '../../../providers';
import { Food, SelectOption, Nutrient } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { deepPropsExist, isEqual } from '../../../helpers';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
})
export class FoodEditComponent implements OnInit {

  page = 'Edit Food Record';
  editForm: FormGroup;
  records: Array<Food>;
  record: Food;
  date: any;

  loading = false;
  nutrientRecords: Array<Nutrient>;
  prevNutrientsRecord: Array<Nutrient>;
  nutrientOptions: SelectOption[];
  selectNutrient: Array<any>;
  multiInputData: Array<SelectOption> = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public foods: Foods,
              private toastr: ToastrService,
              public nutrients: Nutrients,) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.foods.query({ id })[0];
      this.nutrientRecords = this.nutrients.query();
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
     }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
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

    this.editForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      category: deepPropsExist(this.record, 'category') ? this.record.category : '',
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      quantity: deepPropsExist(this.record, 'quantity') ? this.record.quantity : '',
      water: deepPropsExist(this.record, 'water') ? this.record.water : '',
      calories: deepPropsExist(this.record, 'calories') ? this.record.calories : '',
      carbohydrate: deepPropsExist(this.record, 'carbohydrate') ? this.record.carbohydrate : '',
      protein: deepPropsExist(this.record, 'protein') ? this.record.protein : '',
      fats: deepPropsExist(this.record, 'fats') ? this.record.fats : '',
      fibre: deepPropsExist(this.record, 'fibre') ? this.record.fibre : '',
      ph: deepPropsExist(this.record, 'ph') ? this.record.ph : '',
      image: deepPropsExist(this.record, 'image') ? this.record.image : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
    });
    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('category').setValue(this.record.category || '');
    this.editForm.get('name').setValue(this.record.name || '');
    this.editForm.get('quantity').setValue(this.record.quantity || '');
    this.editForm.get('water').setValue(this.record.water || '');
    this.editForm.get('calories').setValue(this.record.calories || '');
    this.editForm.get('carbohydrate').setValue(this.record.carbohydrate || '');
    this.editForm.get('protein').setValue(this.record.protein || '');
    this.editForm.get('fats').setValue(this.record.fats || '');
    this.editForm.get('fibre').setValue(this.record.fibre || '');
    this.editForm.get('ph').setValue(this.record.ph || '');
    this.editForm.get('image').setValue(this.record.image || '');
    this.editForm.get('nutrients').setValue(this.record.nutrients || '');
    this.editForm.get('description').setValue(this.record.description || '');

    console.log('\nrecord ', typeof this.record, this.record);
  }

  ngDoCheck() {
    console.log('Checking ============= !!!!!!!! ');
    if (!isEqual(this.nutrientRecords, this.prevNutrientsRecord)) {
      this.prevNutrientsRecord = [...this.nutrientRecords];
      this.generateCurrentItems();
      this.getNutrientOptions();
    }
  }

  reset() {
    this.editForm.reset();
  }


  onSubmit() {
    const payload = this.editForm.value;
    console.log(payload);
    this.loading = true;
    try {
      this.foods.recordUpdate(this.record, payload)
      .then((res: any) => {
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

  goToAdd(): void {
    this.router.navigate(['food/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`food/detail/${record.id}`]);
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

  generateCurrentItems() {
    this.multiInputData = deepPropsExist(this.record, 'nutrients') ?
    this.record.nutrients.map(item => ({
      id: item.nutrient.id,
      text: item.nutrient.name,
      code: item.quantity,
    })) : [];
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
