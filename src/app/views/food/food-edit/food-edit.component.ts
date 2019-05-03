import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foods } from '../../../providers';
import { Food } from '../../../models';
import { PNotifyService  } from '../../../services';


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
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public foods: Foods,
    private pNotifyService: PNotifyService) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.foods.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
     }

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.editForm = this.formBuilder.group({
      type: [''], // enum: ["DEFAULT", "CUSTOM"]
      category: [''], // enum: ["FOOD", "DRINK"]
      name: [''],
      description: [''],
      quantity: [''],
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
        this.toast(res.message, 'customerror');
      }
    }, (err) => this.toast(err.message, 'customerror'));
      } catch (error) {
        this.toast(error.message, 'customerror');
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

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
