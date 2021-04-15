import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsLayoutComponent,
    children: [
      {
        path: '', component: ProductsListComponent,
      },
      {
        path: ':id', component: ProductDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
