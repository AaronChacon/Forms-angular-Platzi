import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  private buildForm ()  {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  saveLogin() {
    if (this.form.valid) {
      const value = this.form.value; 
      this.authService.loginUser(value.email, value.password)
          .then(() => {
            this.router.navigate(['/admin'])
            console.log('valid');
          })
          .catch(() => {
            alert('User not valid')
          })
    }


  }

}
