import {
  Component, OnInit, forwardRef,
  Input, OnChanges, ViewChild,
  ElementRef, DoCheck, EventEmitter, Output, OnDestroy, ViewChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isEmpty, deepPropsExist, getDeepObjValue } from '../../../../helpers';

interface SelectOption {
  value?: any;
  label?: any;
  subLabel?: any;
  text?: any;
  subText?: any;
  id?: any;
  code?: any;
  name?: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'appanalyst-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements OnInit, OnChanges, DoCheck, OnDestroy, ControlValueAccessor {
  _value: any;
  oldValue: any;
  @Input() placeholder?: string;
  @Input() bindValue: string;
  @Input() bindLabel: string;
  @Input() bindSubLabel?: string;
  @Input() bindInput?: string;
  @Input() multipleInput?: boolean;
  @Input() items: SelectOption[];
  @Input() valueSearchable?: boolean;
  @Input() multiple?: boolean;
  @Input() multiInputData?: Array<SelectOption> = [];
  @Output() changeEvent?: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-rename
  @Output('multipleRecords') multipleRecordsOut?: EventEmitter<any> = new EventEmitter();
  @ViewChild('search') search: ElementRef;
  placeholderValue: string;
  openOptionList = false;
  records: SelectOption[];
  prevRecords: SelectOption[];
  touched: boolean;
  searchValue = false;
  muiltpleRecords: SelectOption[] = [];
  closeMuliple = true;
  @ViewChildren('multipleList')
  lists: QueryList<ElementRef>;
  currentIndex: number;
  propagateChange: any = () => {};
  propagateTouch: any = () => {};

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.placeholderValue = this.placeholder;
    if (Array.isArray(this.items)) {
      this.records = [...this.items];
      const selectItem = this.items.find(item => `${item[this.bindValue]}`.toLowerCase() === `${this._value}`.toLowerCase());
      if (!isEmpty(selectItem)) {
        this.search.nativeElement.value = selectItem[this.bindLabel];
      }
    }

    if (!isEmpty(this.valueSearchable)) {
      this.searchValue = this.valueSearchable;
    }

    if (this.multipleInput) {
      this.muiltpleRecords = [...this.multiInputData];
      const selectedProducts = this.muiltpleRecords.map(record => record[this.bindLabel]);
      if (Array.isArray(this.items)) {
        this.records = this.items.filter(item => selectedProducts.indexOf(item[this.bindLabel]) === -1);
      }
    }
  }

  ngDoCheck() {
    if (
      Array.isArray(this.items)
      && this._value !== this.oldValue
      ) {
      const selectItem = this.items.find(item => `${item[this.bindValue]}`.toLowerCase() === `${this._value}`.toLowerCase());
      if (!isEmpty(selectItem)) {
        this.search.nativeElement.value = selectItem[this.bindLabel];
      } else {
        this.search.nativeElement.value = '';
      }
        this.oldValue = this._value;
    }
  }

  addInput(index) {
    // event.
    if (this.multipleInput && !isEmpty(this.bindInput)) {
      const record = this.muiltpleRecords[index];
      const inputElement = this.lists.find((input, ind) => ind === index);
      const value = (inputElement.nativeElement as HTMLInputElement).value;
      const updateRecord = {...record, ...{[this.bindInput]: value}};
      this.muiltpleRecords[index] = updateRecord;
      this.multipleRecordsOut.emit(this.muiltpleRecords);
      this.currentIndex = index;
    }
  }

  onRemoveItem(record) {
    this.muiltpleRecords = this.muiltpleRecords.filter(item => (
      item[this.bindLabel] !== record[this.bindLabel]
    ));
    this.records = this.items.filter(item => !isEmpty(this.multiple) && this.multiple === true
    ? this.muiltpleRecords
    .map(option => option[this.bindLabel])
    .indexOf(item[this.bindLabel]) === -1 : true
    );
    this.multipleRecordsOut.emit(this.muiltpleRecords);
    const multipleLength = this.muiltpleRecords.length;
    if (multipleLength > 0) {
      const value = this.muiltpleRecords[multipleLength - 1][this.bindLabel];
      this.search.nativeElement.value = value;
      this.propagateChange(value);
    } else {
      this.search.nativeElement.value = '';
      this.propagateChange(null);
    }

  }

  onOpenOptionList() {
    if (!this.multiple) {
      this.search.nativeElement.value = '';
    }
    this.openOptionList = true;
    this.closeMuliple = false;
    this.onTouched();
    if (!this.multiple) {
      this.propagateChange(null);
    }
  }

  onCloseOptionList() {
    if (!this.multiple) {
      this.openOptionList = false;
    }
  }

  onCloseMultipleOption() {
    this.openOptionList = false;
    this.closeMuliple = true;
  }


  onOptionClick(record) {
    this.propagateChange(record[this.bindValue]);
    this.search.nativeElement.value = record[this.bindLabel];
    this.records = [...this.items];
    if (this.multiple) {
      this.muiltpleRecords = this.muiltpleRecords.concat(record);
      this.records = this.items.filter(item => !isEmpty(this.multiple) && this.multiple === true
      ? this.muiltpleRecords
      .map(option => option[this.bindLabel])
      .indexOf(item[this.bindLabel]) === -1 : true
      );
      this.multipleRecordsOut.emit(this.muiltpleRecords);
    } else {
      this.openOptionList = false;
    }
    if (this.changeEvent) {
      this.changeEvent.emit(record);
    }
  }

  onSearch(evt) {
    const value = evt.target.value;
    this.records = this.items.filter(item => (
        (
          isEmpty(value, true)
          || `${item[this.bindLabel]}`.toLowerCase().indexOf(value.toLowerCase()) > -1
          || ( this.searchValue === true ? `${item[this.bindValue]}`.toLowerCase().indexOf(value.toLowerCase()) > -1 : false )
          || (deepPropsExist(item, this.bindSubLabel)
            ? `${item[this.bindSubLabel]}`.toLowerCase().indexOf(value.toLowerCase()) > -1 : false)
        ) && (
          !isEmpty(this.multiple) && this.multiple === true
          ? this.muiltpleRecords
          .map(record => record[this.bindLabel])
          .indexOf(item[this.bindLabel]) === -1 : true
        )
    ));
  }

  getContent(obj, ...props) {
    return getDeepObjValue(obj, ...props);
  }

  onTouched() {
    this.propagateTouch();
  }

  writeValue(value: any) {
     this._value = value;
     if (this._value === null) {
      this.search.nativeElement.value = '';
      if (this.multiple) {
        this.muiltpleRecords = [];
      }
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }

  // register
  ngOnDestroy() {
    this.muiltpleRecords = [];
    this.propagateChange(null);
  }

}
