import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/product.model';
import { MyValidators } from 'src/app/utils/validators';
import { CategoriesService } from '../../../../../core/services/categories.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  
  form: FormGroup;
  id: string;
  categories: Category[] = [];
  images$: Observable<any>;
  img: string;
  states = [
    {name: 'arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ]
  
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.id = params.id;
      this.productsService.getProduct(this.id)
          .subscribe( (product: IProduct) => {
            console.log(product);
            this.img = product.image;
            this.form.patchValue({
              ...product,
              state: this.states[2]
            })
          })
    })
    this.getCategories();
  }

  get priceFiled() {
    return this.form.get('price');
  }

  private buildForm ()  {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', [Validators.required]],
      state: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  saveProduct() {
    console.log(this.form.value);
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
      
      /* this.productsService.updateProduct(this.id, product)
          .subscribe( (newProduct: IProduct) => {
            console.log(newProduct);
            this.router.navigate(['./admin/products'])
          }) */
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
