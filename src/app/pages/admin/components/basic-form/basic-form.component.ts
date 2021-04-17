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
    this.form.valueChanges
        .subscribe(value => {
          console.log(value);
          
        })
  }

  getNameValue(){
    console.log(this.form.get('name').value);
  }

  save(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(){

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)] ],
      enail: [''],
      phone: [''],
      color: ['#000000'],
      date: [''],
      number: [12],
      categoty: [''],
      tag: [''],
      agree: [false],
      gender: [''],
      zone: [''],
    });

  }

  get nameField() {
    return this.form.get('name');
  }

  get isNameValid() {
    return this.form.get('name').touched && this.form.get('name').valid;
  }
  get isNameInValid() {
    return this.form.get('name').touched && this.form.get('name').invalid;
  }

}
