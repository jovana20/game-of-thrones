import { Component } from '@angular/core';
import { Router, NavigationEnd,  Event as RouterEvent  } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-of-thrones';
  showNavbar = true;

  constructor(private router: Router, private store: Store<any>) {

    // @ts-ignore
    if(window.Cypress) {
      // @ts-ignore
      window.store = this.store;
    }
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbar = !event.urlAfterRedirects.includes('/login');
    });
}

}
