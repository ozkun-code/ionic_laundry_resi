import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { AuthenticationService } from '../services/authentication.service';
import { ResiService } from '../services/resi.service';
import {
  callOutline,
  chatbubbleEllipsesOutline,
  locationOutline,
  checkmarkCircleOutline,
  ellipseOutline,
} from 'ionicons/icons';
import {
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

// Import the necessary operators and functions from RxJS
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

addIcons({
  'call-outline': callOutline,
  'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  'location-outline': locationOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'ellipse-outline': ellipseOutline,
});
interface Resi {
  status: string;
  changed_at: Date;
}

@Component({
  selector: 'app-resi',
  templateUrl: './resi.page.html',
  styleUrls: ['./resi.page.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonIcon,
    IonInput,
    IonButton,
    IonCard,
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
    CommonModule,
    FormsModule,
  ],
})
export class ResiPage implements OnInit {
  resiData: { status: string; changed_at: Date }[] = [];
  id: number | undefined; // Initialize the 'resiData' property

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private resiService: ResiService
  ) {} // Add Router as a dependency in the constructor

  ngOnInit() {
    this.id = +this.route.snapshot.params['id']; // Assign id value from route parameters to this.id // Convert id to number if necessary

    this.authService.loadToken().then((token) => {
      if (token !== null && token !== undefined && this.id !== undefined) {
        this.resiService
          .getResiById(this.id)
          .pipe(
            tap(
              (resi: {
                status: string;
                message: string;
                data: { status: string; changed_at: Date }[];
              }) => {
                // Check if resi.data is an array
                if (Array.isArray(resi.data)) {
                  // Map the resi.data array to extract only status and changed_at
                  this.resiData = resi.data.map((item) => ({
                    status: item.status,
                    changed_at: new Date(item.changed_at),
                  }));
                  console.log('Fetched Resi Data:', this.resiData);
                } else {
                  console.error('Resi.data is not an array:', resi.data);
                }
              }
            ),
            catchError((error: any) => {
              console.error('Error fetching Resi data:', error);
              return of(null); // Return observable with null to handle error
            })
          )
          .subscribe();
      }
    });
  }
  getStatusIcon(): string {
    return 'checkmark-circle-outline';
  }
  goBack() {
    this.router.navigate(['tabs/tab1']); // Navigate back
  }
}
