import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { MyValidators } from 'src/app/utils/validators';
import { IProduct } from 'src/app/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  form: FormGroup;
  images$: Observable<any>;
  
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  get priceFiled() {
    return this.form.get('price');
  }

  private buildForm ()  {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
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
      this.productsService.createProduct(product)
          .subscribe( (newProduct: IProduct) => {
            console.log(newProduct);
            this.router.navigate(['./admin/products'])
          })
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const dir = file.name;
    const fileRef = this.storage.ref(dir);
    const task = this.storage.upload(dir, file)
    task.snapshotChanges()
        .pipe(
          finalize(() => {
            this.images$ = fileRef.getDownloadURL()
            this.images$.subscribe(url => {
              this.form.get('image').setValue(url);
            })
          })
        )
        .subscribe();
  }
  
}
