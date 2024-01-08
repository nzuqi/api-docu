import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
  });
  processing: boolean = false;
  destroyed$ = new Subject();

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get emailErrorMessage(): string {
    if (this.controlHasError('email', 'required')) return 'Your email is required';
    return 'Your email is invalid';
  }

  controlHasError(controlName: string, validationType: string): boolean {
    const control = this.signInForm.controls[controlName];
    if (!control) return false;

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  signin(): void {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) return;

    this.setProcessing(true);

    const _done = () => setTimeout(() => { this.setProcessing(false); that.openSnackBar("Oop! Check your credentials & try again."); }, 2000);

    const that = this;
    const email = this.signInForm.controls['email'].value;
    const password = this.signInForm.controls['password'].value;

    this.authService.signin(email, password).pipe(takeUntil(this.destroyed$)).subscribe({
      next(response) {
        if (response) {
          that.router.navigateByUrl('/');
          that.openSnackBar("You've signed in successfully.");
        } else {
          _done();
        }
      },
      error(err) {
        _done();
      }
    });
  }

  private setProcessing(status: boolean): void {
    const controls = this.signInForm.controls;
    status ? controls['email'].disable() : controls['email'].enable();
    status ? controls['password'].disable() : controls['password'].enable();
    this.processing = status;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 10000, verticalPosition: 'top' });
  }
}
