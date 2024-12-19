import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { changeLoaderStatus } from '../shared/function/shared.function';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ToastrModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loading = false;
  showPassword = true;

  authSub$!: Subscription;
  forgotSub$!: Subscription;
  signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private toast: ToastrService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    //preloader hide
    changeLoaderStatus()

    // form create
    this.signInForm = new FormGroup({
      emailOrUsername: new FormControl('admin', [Validators.required]),
      password: new FormControl('Admin123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
    });
  }

  public showHidePassword(): void {
    const input = document.getElementById('password');
    if (input) {
      if (input.getAttribute('type') === 'password') {
        input.removeAttribute('type');
        input.setAttribute('type', 'text');
      } else {
        input.removeAttribute('type');
        input.setAttribute('type', 'password');
      }
    }
  }
  public forgotPassword(): void {
    this.dialog.open(ForgotPasswordComponent, {
      data: {
        confirmPass: '',
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    });
  }

  public submitSignIn(): void {
    this.signInForm.disable();

    this.authSub$ = this.authService.login(this.signInForm.value).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.toast.error(error.error.message);
        this.signInForm.enable();
      },
      () => {
        this.signInForm.enable();
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.forgotSub$) {
      this.forgotSub$.unsubscribe();
    }
    if (this.authSub$) {
      this.authSub$.unsubscribe();
    }
  }
}
