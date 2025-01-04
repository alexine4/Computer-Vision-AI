import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  // login
  public login(user: User): Observable<{ token: string }> {
    const expiresDate = new Date();
    expiresDate.setHours(expiresDate.getHours() + 24);
    return this.httpClient
      .post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          this.cookieService.set('Authorization', token, expiresDate, '/');
          this.setToken(token);
        })
      );
  }
  public setToken(token: string) {
    this.token = token;
  }
  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logOut() {
    this.setToken('');
    this.cookieService.delete('Authorization','/')
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', user);
  }

  // check user if fogot password

  public checkUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/checkUser', user);
  }
  // change password
  public changePassword(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/changePassword', user);
  }
}
