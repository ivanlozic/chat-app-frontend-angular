import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const authenticatedUser = this.authService.getAuthenticatedUser();

    this.userForm = this.formBuilder.group({
      id: [authenticatedUser?.id],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      mobileNumber: [''],
    });

    if (authenticatedUser) {
      this.userForm.patchValue(authenticatedUser);
    }

    this.userForm.valueChanges.subscribe((value) => {
      this.onValueChanged(value);
    });
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }

    const form = this.userForm;

    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  formErrors: { [key: string]: string } = {
    username: '',
    email: '',
  };

  validationMessages: { [key: string]: { [key: string]: string } } = {
    username: {
      required: 'Username is required.',
      minlength: 'Username must be at least 3 characters long.',
      maxlength: 'Username cannot be more than 20 characters long.',
    },
    email: {
      required: 'Email is required.',
      email: 'Invalid email address.',
    },
  };

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      console.log(user);
      this.userService.updateUserProfile(user).subscribe(
        (response: any) => {
          console.log('Profile updated successfully:', response);
          this.showSuccessPrompt();
          this.authService.logout();
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          this.showFailurePrompt();
        }
      );
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  showSuccessPrompt() {
    this.snackBar.open('Profile updated successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showFailurePrompt() {
    this.snackBar.open('Error updating profile. Please try again.', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
