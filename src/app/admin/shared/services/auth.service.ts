import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FbAuthResponse, User } from "../interfaces";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expiresDate: Date = new Date(localStorage.getItem('fb-token-exp')!)
    if (new Date() > expiresDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FbAuthResponse> {
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response ) => this.setToken(response)) ,
        catchError( err => this.handleError(err) as never)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break
    }

    return throwError(error)
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null): void {
    if (response){
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', JSON.stringify(expiresDate))
    } else {
      localStorage.clear()
    }
  }
}
