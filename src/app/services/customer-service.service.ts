import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'; // Import the AuthenticationService class

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getCustomer(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    return this.http
      .get<{ status: string; message: string; data: any }>(
        'http://127.0.0.1:8000/api/customer',
        { headers }
      )
      .pipe(map((response) => response.data));
  }
  getTransactionsByUserId(userId: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    return this.http
      .get<{ status: string; message: string; data: any }>(
        `http://127.0.0.1:8000/api/transaksi/${userId}`,
        { headers }
      )
      .pipe(map((response) => response.data));
  }
}
