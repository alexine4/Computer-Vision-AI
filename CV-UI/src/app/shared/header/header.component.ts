import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    RouterModule,
    CommonModule,
  ],
  providers: [CookieService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentLanguage: string = 'en';
  isAuthorize = false;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.translate.addLangs(['uk', 'en']);
    //this.translate.setDefaultLang('en');
    this.currentLanguage = this.cookieService.get('language') || 'en';
    this.translate.use(this.currentLanguage);
    this.isAuthorize = authService.isAuthenticated();
  }

  public useLanguage(language: string): void {
    this.currentLanguage = language;
    this.cookieService.set('language', language, { expires: 7, path: '/' });
    this.translate.use(language);
  }

  public logOut():void{
    this.authService.logOut()
  }

  public openPage(url: string):void{
    this.router.navigateByUrl(url)
  }
}
