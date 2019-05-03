import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../models';
import { Foods } from '../../../providers';
import { PNotifyService  } from '../../../services';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
})
export class FoodAddComponent implements OnInit {

  page = 'Add New Food';
  addForm: FormGroup;
  nutrientOptions: SelectOption[];

  loading = false;
  notify: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public foods: Foods,
    private pNotifyService: PNotifyService) {}

  ngOnInit() {
    this.notify = this.pNotifyService.getPNotify();

    this.addForm = this.formBuilder.group({
      type: ['', Validators.required], // enum: ["DEFAULT", "CUSTOM"]
      category: ['', Validators.required], // enum: ["FOOD", "DRINK"]
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
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
      this.foods.recordCreate(payload)
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

  toast (message: any, messageclass: string) {
    this.notify.alert({
      text: message,
      addClass: messageclass
    });
  }

}
