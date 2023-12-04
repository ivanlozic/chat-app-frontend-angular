import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { selectError, selectLoggedIn } from '../../../auth/auth.reducers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  loggedIn$ = this.store.pipe(select(selectLoggedIn));
  error$ = this.store.pipe(select(selectError));

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  showSignUp() {
    const modalRef = this.modalService.open(RegisterModalComponent);
  }
  async login() {
    try {
      const response = await this.authService
        .login(this.username, this.password)
        .toPromise();

      if (response) {
        this.store.dispatch({ type: 'LOGGED_IN' });
        this.router.navigate(['/chat']);
      } else {
        console.error('Login failed: Invalid token in response');
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
    }
  }
}
