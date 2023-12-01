import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  constructor(public activeModal: NgbActiveModal) {}



  imageUrl: string = '';

  handleImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Display the preview
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  register() {
    // Add logic for handling registration form submission
    // You can close the modal after successful registration
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.close();
  }
}
