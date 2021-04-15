import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;
  
  installEvent = null;

  constructor(
    private cartService: CartService,
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    )

    /* .subscribe(total => {
      this.total = total;
    }) */
  }

  ngOnInit(): void {
  }

  

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeiInstallPrompt(event: Event){
    event.preventDefault();
    console.log(event);
    this.installEvent = event
  }

  installByUser() {
    if (this.installEvent ) {
      this.installEvent.prompt();
      this.installEvent.userChoise()
      .then(rta => {
        console.log(rta);
      });
    }
  }

}
