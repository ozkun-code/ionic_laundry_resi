import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoGoogle, logoApple } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,

    private loadingController: LoadingController
  ) {
    addIcons({
      logoGoogle,
      logoApple,
    });
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['ozi@mail.com', [Validators.required, Validators.email]],
      password: ['washup', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async () => {
        await loading.dismiss();
        const token = localStorage.getItem('my-token'); // Get the token from local storage
        console.log('Token:', token); // Print the token to the console
        this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
