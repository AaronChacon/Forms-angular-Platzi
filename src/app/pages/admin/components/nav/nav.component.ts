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

  btnNP = true;

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

  /* ngDoCheck(): void {
    this.btnHidden()
  } */

  btnHidden() {
    if (this.router.url  == '/admin/create') {
      this.btnNP = false;
    } else {
      this.btnNP = true;
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
