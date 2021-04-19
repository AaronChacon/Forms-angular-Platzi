import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './containers/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'create',
    component: CategoryComponent
  },
  {
    path: 'edit/:id',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
