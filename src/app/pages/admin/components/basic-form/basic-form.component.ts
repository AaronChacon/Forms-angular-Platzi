import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;

  constructor( 
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    /* this.form.valueChanges
        .subscribe(value => {
          console.log(value);
          
        }) */
  }

  getNameValue(){
    console.log(this.form.get('name').value);
  }

  save(event: Event){
    event.preventDefault();
    console.log(this.form.valid);
    
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(){

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.form = this.formBuilder.group({
      fullname: this.formBuilder.group({
        name: ['aaronch', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/) ] ],
        last: ['frontend', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/) ] ],
      }),
      email: ['mail@aaronch.com', [Validators.required, Validators.email]],
      phone: ['920880481', [Validators.required]],
      color: ['#000000'],
      date: this.formBuilder.group({
        start: [new Date(year, month, 15)],
        end: [new Date(year, month, 15)],
      }),
      number: [29, [Validators.required, Validators.min(18), Validators.max(120)]],
      categoty: ['category-2'],
      //tag: [''],
      agree: [true, [Validators.requiredTrue]],
      //gender: [''],
      //zone: [''],
    });

  }

  /// name

  get nameField() {
    return this.form.get('fullname').get('name');
  }

  get isNameValid() {
    return this.form.get('fullname').get('name').touched && this.form.get('fullname').get('name').valid;
  }
  get isNameInValid() {
    return this.form.get('fullname').get('name').touched && this.form.get('fullname').get('name').invalid;
  }

  /// last

  get lastField() {
    return this.form.get('fullname').get('last');
  }

  get isLastValid() {
    return this.form.get('fullname').get('last').touched && this.form.get('fullname').get('last').valid;
  }
  get isLastInValid() {
    return this.form.get('fullname').get('last').touched && this.form.get('fullname').get('last').invalid;
  }

  /// Email

  get emailField() {
    return this.form.get('email');
  }

  get isEmailValid() {
    return this.form.get('email').touched && this.form.get('email').valid;
  }
  get isEmailInValid() {
    return this.form.get('email').touched && this.form.get('email').invalid;
  }

  /// phone
  
  get phoneField() {
    return this.form.get('phone');
  }

  get isPhoneValid() {
    return this.form.get('phone').touched && this.form.get('phone').valid;
  }
  get isPhoneInValid() {
    return this.form.get('phone').touched && this.form.get('phone').invalid;
  }
  

}
