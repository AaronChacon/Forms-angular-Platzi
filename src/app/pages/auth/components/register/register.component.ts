import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MyValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  get typeField(){
    return this.form.get('type')
  }
  
  get companyNameField(){
    return this.form.get('companyName')
  }

  private buildForm ()  {
    this.form = this.fb.group({
      email: ['mail@aaronch.com', [Validators.required]],
      password: ['1234567890', [Validators.required, Validators.minLength(6), MyValidators.validPassword,]],
      confirmPassword: ['1234567890', [Validators.required,]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
    },{
      validators: MyValidators.matchPassword
    });

    this.typeField.valueChanges
        .subscribe(value => {
          console.log(value);
          if(value === 'company') {
            this.companyNameField.setValidators([Validators.required])
          } else {
            this.companyNameField.setValidators(null)
          }
          this.companyNameField.updateValueAndValidity();
        })
  }

  register() {
    if (this.form.valid) {
      const value = this.form.value
      console.log(value);
      this.authService.createUser(value.email, value.password)
          .then(() => {
            this.router.navigate(['auth/login']);
          });
    }

  }

}
