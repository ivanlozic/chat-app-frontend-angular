import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  constructor(private activeModal: NgbActiveModal, private http: HttpClient) {}

  imageUrl: string = '';

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
    const user = {
      id: 4,
      username: 'Emma',
      email: 'emma@example.com',
      firstName: 'Emma',
      lastName: 'Watson',
      password: 'emma@123',
      repeatPassword: 'emma@123',
      mobileNumber: '9998887777',
    };

    this.http
      .post('http://localhost:5000/user', user, { responseType: 'text' })
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

  closeModal() {
    this.activeModal.close();
  }
}
