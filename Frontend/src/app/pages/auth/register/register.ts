import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ModalComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form = {
    name: '',
    department: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
  };

  // Modal states
  isOpen = false;
  title = '';
  message = '';

  constructor(private authService: Auth, private router: Router) {}

  openModal(title: string, msg: string) {
    this.title = title;
    this.message = msg;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onRegister() {

    if (this.form.password !== this.form.confirmPassword) {
      this.openModal("Password Error", "Passwords do not match!");
      return;
    }

    const data = {
      name: this.form.name,
      department: this.form.department,
      email: this.form.email,
      password: this.form.password,
      confirmPassword: this.form.confirmPassword,
      adminKey: this.form.adminKey
    };

    this.authService.register(data).subscribe({
      next: (res: any) => {

        this.openModal("Registration Successful", "You can now log in.");

        setTimeout(() => {
          this.isOpen = false;
          this.router.navigate(['/login']);
        }, 1200);
      },

      error: (err) => {
        this.openModal("Registration Failed", err.error.message || "Please try again.");
      }
    });
  }
}
