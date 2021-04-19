import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from 'src/app/core/models/category.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  urlImage$: Observable<string>;
  categoryId: string;

  
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory(this.categoryId);
      }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(4)], MyValidators.validateCategory(this.categoriesService)],
      image: ['', Validators.required]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (this.categoryId) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['/admin/categories']);
    });
  }

  private updateCategory() {
    const data = this.form.value;
    const id = this.categoryId;
    this.categoriesService.updateCategory(id, data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['/admin/categories']);
    });
  }

  private getCategory(id: string){
    this.categoriesService.getCategory(id)
    .subscribe(data => {
      console.log(data);
      this.form.patchValue(data);
    });
  }

  uploadFile(event){
    console.log(event);
    
    const image = event.target.files[0];
    const name = event.target.files[0].name;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);
    
    task.snapshotChanges()
        .pipe(
          finalize(()=> {
            this.urlImage$ = ref.getDownloadURL(); 
            this.urlImage$.subscribe(url => {
              console.log(url);
              this.imageField.setValue(url);
            });
          })
        )
        .subscribe();
  }


}
