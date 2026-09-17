import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, timeout } from 'rxjs';
import { LoginCommand } from '../models/auth.model';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../models/auth.model';
import { RegisterCommand } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  loggedIn = signal(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  login(credentials: LoginCommand): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      timeout(15000),
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
          this.loggedIn.set(true);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.loggedIn.set(false);
    }
  }

  register(command: RegisterCommand): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, command).pipe(timeout(15000));
  }

  getToken(): string | null {
  return this.isBrowser ? localStorage.getItem('token') : null;
}

isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}


}