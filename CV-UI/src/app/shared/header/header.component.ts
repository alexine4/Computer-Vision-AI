import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule, TranslateModule, RouterModule],
  providers: [CookieService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentLanguage: string = 'en';

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService
  ) {
    this.translate.addLangs(['uk', 'en']);
    //this.translate.setDefaultLang('en');
    this.currentLanguage = this.cookieService.get('language') || 'en';
    this.translate.use(this.currentLanguage);
  }

  useLanguage(language: string): void {
    this.currentLanguage = language
    this.cookieService.set('language', language, { expires: 7, path: '/' });
    this.translate.use(language);
  }
}
