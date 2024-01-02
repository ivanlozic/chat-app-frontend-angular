import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../../../../../services/register.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  loading: boolean = false;
  registrationForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  imageUrl: string = '';

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required],
        mobileNumber: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  register() {
    if (this.registrationForm.valid && !this.loading) {
      if (this.registrationForm.hasError('passwordMismatch')) {
        console.error('Passwords do not match');
        return;
      }

      this.loading = true;
      const formData = this.registrationForm.value;

      delete formData.repeatPassword;

      this.registerService
        .registerUser(formData)
        .subscribe(
          (response) => {
            console.log('Registration successful:', response);
            this.activeModal.close();
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
