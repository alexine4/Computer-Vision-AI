import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { token } from './shared/classes/token-interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'CV-UI';
  constructor(
    private auth: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    const potentialToken = this.cookieService.get('Authorization');
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }
}

