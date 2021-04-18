import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import { AdminRoutingModule } from './admin.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
// Components
import { NavComponent } from './components/nav/nav.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';

@NgModule({
  declarations: [
    NavComponent,
    BasicFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
