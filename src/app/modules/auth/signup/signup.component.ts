import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
  });
  processing: boolean = false;
  destroyed$ = new Subject();

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get emailErrorMessage(): string {
    if (this.controlHasError('email', 'required')) return 'Your email is required';
    return 'Your email is invalid';
  }

  controlHasError(controlName: string, validationType: string): boolean {
    const control = this.signUpForm.controls[controlName];
    if (!control) return false;

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  signup(): void {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;

    this.setProcessing(true);

    const user = {
      name: this.signUpForm.controls['name'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
    }

    const _done = () => setTimeout(() => { this.setProcessing(false); that.alertService.openSnackBar("Oop! Check your credentials & try again."); }, 2000);

    const that = this;

    this.authService.signup(user).pipe(takeUntil(this.destroyed$)).subscribe({
      next(response) { if (response) { setTimeout(() => { that.router.navigateByUrl('/auth/signin'); that.alertService.openSnackBar("You've signed up successfully."); }, 2000); } else { _done(); } },
      error(err) { _done(); }
    });
  }

  private setProcessing(status: boolean): void {
    const controls = this.signUpForm.controls;
    status ? controls['name'].disable() : controls['name'].enable();
    status ? controls['email'].disable() : controls['email'].enable();
    status ? controls['password'].disable() : controls['password'].enable();
    this.processing = status;
  }
}
