import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home.routing';

BannerComponent

@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgxUsefulSwiperModule
    ],
    
})
export class HomeModule {

}