import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrients, Foods } from '../../../providers';
import { Nutrient, ApiResponse, SelectOption, Food } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { deepPropsExist, isEqual } from 'src/app/helpers';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nutrient-edit',
  templateUrl: './nutrient-edit.component.html',
})
export class NutrientEditComponent implements OnInit {

  page = 'Edit Nutrient Record';
  editForm: FormGroup;
  record: Nutrient;
  loading = false;

  foodOptions: SelectOption[];
  foodRecords: Array<Food>;
  prevFoodRecords: Array<Food>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              public nutrients: Nutrients,
              public foods: Foods) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const record = this.nutrients.query({id})[0];
        if (!!record) {
          this.record = record;
          console.log(this.record);
        } else {
          this.goBack();
        }
        this.foodRecords = this.foods.query();
    }

  ngOnInit() {

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

    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      category: deepPropsExist(this.record, 'category') ? this.record.category : '',
      symbol: deepPropsExist(this.record, 'symbol') ? this.record.symbol : '',
      classification: deepPropsExist(this.record, 'classification') ? this.record.classification : '',
      source: deepPropsExist(this.record, 'source') ? this.record.source : '',
      use: deepPropsExist(this.record, 'use') ? this.record.use : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      deficiency: deepPropsExist(this.record, 'deficiency') ? this.record.deficiency : '',
      excess: deepPropsExist(this.record, 'excess') ? this.record.excess : '',
      ear: deepPropsExist(this.record, 'ear') ? this.record.ear : '',
      limit: deepPropsExist(this.record, 'limit') ? this.record.limit : '',
      rda_male: deepPropsExist(this.record, 'rda_male') ? this.record.rda_male : '',
      rda_female: deepPropsExist(this.record, 'rda_female') ? this.record.rda_female : '',
      unit: deepPropsExist(this.record, 'unit') ? this.record.unit : '',
      image: deepPropsExist(this.record, 'image') ? this.record.image : '',
      foods: deepPropsExist(this.record, 'foods') ? this.record.foods : '',
    });

    console.log('\nrecord ', typeof this.record, this.record);
  }

  ngDoCheck() {
    if (!isEqual(this.foodRecords, this.prevFoodRecords)) {
      this.prevFoodRecords = [...this.foodRecords];
      this.getFoodOptions();
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
      this.nutrients.recordUpdate(this.record, payload)
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

  getFoodOptions() {
    this.foodOptions = this.foodRecords.map(item => (
      { id: item.id, text: item.name }));
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
