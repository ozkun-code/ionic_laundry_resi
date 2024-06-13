import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'my-token';

interface Profile {
  name: string;
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
      return token; // Return the token
    } else {
      this.isAuthenticated.next(false);
      return null; // Return null if there is no token
    }
  }
  login(credentials: { email: any; password: any }): Observable<any> {
    return this.http.post(`http://localhost:8000/api/login`, credentials).pipe(
      map((response: any) => {
        return response.data.token; // Access the token from inside the data object
      }),
      tap((token) => {
        localStorage.setItem(TOKEN_KEY, token);
        console.log('Token after storing:', localStorage.getItem(TOKEN_KEY)); // Log the token after storing
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: TOKEN_KEY });
  }
}
