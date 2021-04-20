import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

BannerComponent

@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        NgxUsefulSwiperModule
    ],
    
})
export class HomeModule {

}