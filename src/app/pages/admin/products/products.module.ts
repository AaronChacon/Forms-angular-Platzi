import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products.routing';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';


@NgModule({
  declarations: [
    ProductEditComponent,
    ProductFormComponent,
    ProductsCatalogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductsModule { }
