import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsCatalogComponent
  },
  {
    path: 'products/create',
    component: ProductFormComponent
  },
  {
    path: 'products/edit/:id',
    component: ProductEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
