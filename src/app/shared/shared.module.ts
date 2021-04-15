import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
//Directives
import { HighlightDirective } from '../shared/directive/highlight.directive';
//Pipes
import { ExponentialPipe } from '../shared/pipe/exponential.pipe'
//Components
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
