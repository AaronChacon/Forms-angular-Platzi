import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories.routing';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { CategoryComponent } from './containers/category/category.component';


@NgModule({
  declarations: [
    CategoriesComponent, 
    CategoryFormComponent, CategoryComponent 
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CategoriesModule { }
