import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
  });
  processing: boolean = false;

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

    this.signInForm.controls['email'].disable();
    this.signInForm.controls['password'].disable();
    this.processing = true;

    setTimeout(() => {
      this.signInForm.controls['email'].enable();
      this.signInForm.controls['password'].enable();
      this.processing = false;
    }, 2000);
    console.log(this.signInForm.value);
  }
}
