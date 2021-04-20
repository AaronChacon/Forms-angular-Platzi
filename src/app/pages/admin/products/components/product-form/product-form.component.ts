import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { MyValidators } from 'src/app/utils/validators';
import { IProduct } from 'src/app/product.model';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  form: FormGroup;
  images$: Observable<any>;
  categories: Category[] = [];
  
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService,
  ) {
    this.buildForm();
  }

  ngOnInit(){
    this.getCategories();
  }

  get priceFiled() {
    return this.form.get('price');
  }

  private buildForm ()  {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: [100, [Validators.required]],
    });

    this.form.get('stock').valueChanges
        .subscribe(value => {
          console.log(value);
        })
  }

  saveProduct() {
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
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

  private getCategories(){
    this.categoriesService.getAllCategories()
        .subscribe( (data) => {
          console.log(data);
          this.categories = data;
        })
  }
  
}
