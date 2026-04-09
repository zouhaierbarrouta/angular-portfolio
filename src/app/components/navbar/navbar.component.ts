import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentLanguage: 'en' | 'fr' = 'en';

  constructor(
    public themeService: ThemeService,
    private dialog: MatDialog,
    public authService: AuthService,
    private router: Router
  ) { 
    this.currentLanguage = (localStorage.getItem('language') as 'en' | 'fr') || 'en';
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: 'en' | 'fr') {
    this.currentLanguage = lang;
    if ((window as any).applyLanguage) {
      (window as any).applyLanguage(lang);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onStatisticsClick(event: Event) {
    event.preventDefault();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/statistics']);
    } else {
      const dialogRef = this.dialog.open(LoginModalComponent, {
        width: '95%',
        maxWidth: '700px',
        panelClass: 'custom-dialog-container'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/statistics']);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToSection(sectionId: string, event: Event) {
    if (this.router.url !== '/' && this.router.url !== '/#') {
      event.preventDefault();
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }
  isActive(url: string): boolean {
    return this.router.url === url;
  }

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/#';
  }
}
