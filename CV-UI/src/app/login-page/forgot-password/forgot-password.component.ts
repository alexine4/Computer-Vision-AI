import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { changeLoaderStatus } from '../../shared/function/shared.function';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  mode = 'check user data'
  loading = false
  changePassSub$!: Subscription
  changePasswordForm!: FormGroup
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) { }



  public ngOnInit(): void {

    this.changePasswordForm = new FormGroup({
      email: new FormControl('admin@g.com', [
        Validators.required,
        Validators.email,
      ]),
      userName: new FormControl('admin', [Validators.required]),
      password: new FormControl('Admin123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      passwordConfirm: new FormControl('Admin123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      
    });

    // preloader hide
    changeLoaderStatus().then(loading => this.loading = loading);
  }

  public confirmUserData(): void {

    this.changePasswordForm.disable()

    const user = {
      email: this.changePasswordForm.value.email,
      userName: this.changePasswordForm.value.userName,
      password: '',
    }
    this.loading = false
    this.changePassSub$ = this.authService.checkUser(user).subscribe(
      () => {

        this.mode = 'change password'
        changeLoaderStatus()
      },
      error => {
        this.changePasswordForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.changePasswordForm.enable()
        this.toast.success('User data confirm')
      }
    )

  }

  public changePassword(): void {
    this.changePasswordForm.disable()
    const user = {
      email: this.changePasswordForm.value.email,
      userName: this.changePasswordForm.value.userName,
      password: this.changePasswordForm.value.password,
    }

    this.changePassSub$ = this.authService.changePassword(user).subscribe(
      () => {
        setTimeout(() => {
          this.dialogRef.close()
        }, 2000);
      },
      error => {
        this.changePasswordForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.toast.success('Password successfuly updated')
        this.changePasswordForm.enable()
      }
    )

  }

  public onNoClick(): void {
    this.dialogRef.close()
  }

 

  ngOnDestroy(): void {
    if (this.changePassSub$) {
      this.changePassSub$.unsubscribe()
    }
  }
}