import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> StepperComponent),
      multi: true 
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {

  curretValue = 0;
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.curretValue = this.curretValue + 1;
    this.onTouch()
    this.onChange(this.curretValue);
  }
  
  sub(){
    this.curretValue = this.curretValue - 1;
    this.onTouch()
    this.onChange(this.curretValue);
  }

  writeValue(value: number): void {
    if (value) {
      this.curretValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled= isDisabled;
  }


}
