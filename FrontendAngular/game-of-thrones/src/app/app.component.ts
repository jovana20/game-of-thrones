import { Component } from '@angular/core';
import { Router, NavigationEnd,  Event as RouterEvent  } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-of-thrones';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Set showNavbar to false if the current URL is '/login', otherwise true
      this.showNavbar = !event.urlAfterRedirects.includes('/login');
    });
}

}
