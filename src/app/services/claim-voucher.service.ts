import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'; // Import the AuthenticationService class

@Injectable({
  providedIn: 'root',
})
export class ClaimVoucherService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getVouchers(): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    return this.http
      .get<{ status: string; message: string; data: any[] }>(
        'http://127.0.0.1:8000/api/vouchers/',
        { headers }
      )
      .pipe(map((response) => response.data));
  }
  claimVoucher(voucherId: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
    return this.http
      .post<{ status: string; message: string; data: any }>(
        `http://127.0.0.1:8000/api/claim-voucher/${voucherId}`,
        {},
        { headers }
      )
      .pipe(map((response) => response.message));
  }
}
