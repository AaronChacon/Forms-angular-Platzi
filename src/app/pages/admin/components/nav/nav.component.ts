import { Component, DoCheck, } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Routes, Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  btnPro = false;
  btnCat = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    ) {

  }

  ngDoCheck(): void {
    this.btnProducts()
    this.btnCategory()
  }

  btnProducts() {
    //console.log(this.router.url);
    if (this.router.url  === '/admin/products') {
      this.btnPro = true;
    } else {
      this.btnPro = false;
    }
  }
  
  btnCategory() {
    if (this.router.url  === '/admin/categories') {
      this.btnCat = true;
    } else {
      this.btnCat = false;
    }
  }

  logout() {
    this.authService.logout()
        .then(() => {
          console.log('logout');
          this.router.navigate(['./home']);
        });
  }


}
