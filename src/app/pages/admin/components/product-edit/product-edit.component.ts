import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { IProduct } from '../../../../product.model';
import { MyValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  
  form: FormGroup;
  id: string;
  
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.id = params.id;
      this.productsService.getProduct(this.id)
          .subscribe( (product: IProduct) => {
            this.form.patchValue(product)
          })
    })
  }

  get priceFiled() {
    return this.form.get('price');
  }

  private buildForm ()  {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
    })
  }

  saveProduct() {
    console.log(this.form.value);
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
          .subscribe( (newProduct: IProduct) => {
            console.log(newProduct);
            this.router.navigate(['./admin/products'])
          })
    }
  }

}
