import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthenticationService } from '../services/authentication.service';
import { CustomerService } from '../services/customer-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap, switchMap, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'; // Import schemas

interface Customer {
  id: number;
  name: string;
  points: number;
}

interface Transaction {
  id: number;
  price: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, CommonModule], // Add CommonModule here
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Add schemas
})
export class Tab1Page implements OnInit {
  customer: Customer | null = null;
  transactions: Transaction[] = [];
  resiNumber: string = ''; // Initialize resiNumber with an empty string

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.authService.loadToken().then((token) => {
      if (token !== null && token !== undefined) {
        this.customerService
          .getCustomer()
          .pipe(
            tap((customer: Customer) => {
              this.customer = {
                id: customer.id,
                name: customer.name,
                points: customer.points,
              };
              console.log(this.customer);
            }),
            switchMap((customer: Customer) =>
              this.customerService.getTransactionsByUserId(customer.id).pipe(
                map(
                  (
                    transactions: {
                      id: number;
                      status: string;
                      price: number;
                    }[]
                  ) =>
                    transactions.map(({ id, status, price }) => ({
                      id,
                      price,
                    }))
                )
              )
            )
          )
          .subscribe(
            (transactions: Transaction[]) => {
              this.transactions = transactions;
              console.log(this.transactions);
            },
            (error: any) => {
              console.error('Error fetching data:', error);
            }
          );
      } else {
        console.error('No token found');
      }
    });
  }

  navigateToClaimVoucher() {
    this.router.navigate(['/claim-voucher']); // Navigate to Claim Voucher page
  }

  checkResi(resiId: string | number) {
    this.router.navigate(['/resi', { id: resiId }]);
  }

  logout() {
    this.authService.logout(); // Call the logout method from the AuthenticationService
  }
}
