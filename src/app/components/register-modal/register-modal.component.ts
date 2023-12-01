import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  register() {
    // Add logic for handling registration form submission
    // You can close the modal after successful registration
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.close();
  }
}
