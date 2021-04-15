import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFountRoutingModule } from './page-not-fount.routing';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PageNotFountRoutingModule
  ]
})
export class PageNotFountModule { }
