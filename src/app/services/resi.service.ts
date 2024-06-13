import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ResiService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getResiById(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    return this.http.get<any>(`http://127.0.0.1:8000/api/resi/${id}`, {
      headers,
    });
  }
}
