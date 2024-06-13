import { Component, OnInit, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonRow,
  IonCol,
  IonAvatar,
  IonIcon,
  IonInput,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonText,
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { ClaimVoucherService } from '../services/claim-voucher.service';
import { Router } from '@angular/router';

interface Voucher {
  id: number;
  name: string;
  discount_percent: string;
  points_required: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-claim-voucher',
  templateUrl: './claim-voucher.page.html',
  styleUrls: ['./claim-voucher.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonRow,
    IonCol,
    IonAvatar,
    IonIcon,
    IonInput,
    IonCard,
    IonButton,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonText,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ClaimVoucherPage implements OnInit {
  vouchers: Voucher[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private claimVoucherService: ClaimVoucherService
  ) {}

  ngOnInit() {
    this.authService.loadToken().then((token) => {
      console.log('Token:', token); // Log the token
      if (token !== null && token !== undefined) {
        this.claimVoucherService.getVouchers().subscribe(
          (vouchers: Voucher[]) => {
            this.vouchers = vouchers;
            console.log(this.vouchers);
            // Assign the vouchers to the vouchers property
          },
          (error: any) => {
            console.error('Error fetching vouchers:', error);
          }
        );
      } else {
        console.error('No token found');
      }
    });
  }
  claimVoucher(voucherId: number) {
    this.claimVoucherService.claimVoucher(voucherId).subscribe(
      (message: string) => {
        console.log(message);
        // Handle the message here
      },
      (error: any) => {
        console.error('Error claiming voucher:', error);
      }
    );
  }
}
