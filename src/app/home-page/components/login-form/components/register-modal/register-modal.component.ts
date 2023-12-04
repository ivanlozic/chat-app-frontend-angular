import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  imageUrl: string = '';

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      mobileNumber: ['', Validators.required],
    });
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
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      this.http
        .post('http://localhost:5000/user', formData, { responseType: 'text' })
        .subscribe(
          (response) => {
            console.log('Registration successful:', response);
            this.activeModal.close();
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
