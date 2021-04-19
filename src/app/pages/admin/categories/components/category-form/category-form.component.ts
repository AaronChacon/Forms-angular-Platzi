import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  isNew = true;
 
  @Input()
  set category(data: Category){
    if(data){
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();;

  
  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
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
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
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
