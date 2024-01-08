import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string | null>('', { nonNullable: true, validators: [Validators.required] }),
  });

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
    console.log(this.signUpForm.value);
  }
}
