import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../product.model';
import { CartService } from '../../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<IProduct[]>

  form: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder, 
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: this.formBuilder.array([])
    })
  }

  addAddressField(){
    this.addressField.push(this.createAddressField());
  }

  private createAddressField(){
    return this.formBuilder.group({
      zip: ['', [Validators.required]],
      text: ['', [Validators.required]],
    })
  }

  get addressField(){
    return this.form.get('address') as FormArray;
  }

  saveData(event){
    event.preventDefault();
    console.log(this.form.value);
  }

}
