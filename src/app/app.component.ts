import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rezume';
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Apply translations instantly to newly loaded components
      setTimeout(() => {
        if (typeof (window as any).applyLanguage === 'function') {
          const lang = localStorage.getItem('language') || 'en';
          (window as any).applyLanguage(lang);
        }
      }, 50);

      // Re-trigger animations after a small delay to ensure DOM is ready
      setTimeout(() => {
        if ((window as any).refreshAnimations) {
          (window as any).refreshAnimations();
        }
      }, 500);
    });
  }
}
