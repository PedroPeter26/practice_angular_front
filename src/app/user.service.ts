import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrlRegister = 'http://127.0.0.1:3333/api/register';
  private apiUrlLogin = 'http://127.0.0.1:3333/api/login';
  private apiUrlLogout = 'http://127.0.0.1:3333/api/logout';
  private apiUrlAddresses = 'http://127.0.0.1:3333/api/users/addresses';
  private apiUrlIndex = 'http://127.0.0.1:3333/api/users';
  //?Token
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, user);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, credentials)
      .pipe(
        tap(response => this.storeToken(response.token.token))
      );
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logoutUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Logout token:', token); 
    return this.http.post<any>(this.apiUrlLogout, {}, { headers }).pipe(
      tap(() => localStorage.removeItem(this.tokenKey))
    );
  }

  getUsers(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrlIndex, { headers });
  }
}
