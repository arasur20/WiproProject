import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ModalComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form = {
    email: '',
    password: ''
  };

  // Modal variables
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

  onLogin() {

    const data = {
      email: this.form.email,
      password: this.form.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {

        const user = res.user;


        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);


        this.openModal("Login Successful", "Welcome back!");


        setTimeout(() => {
          this.isOpen = false;
          if (user.role === "ADMIN") {
            localStorage.setItem("adminId", user.id || user._id);
            console.log(user.id)
            this.router.navigate(['/admin']);
          } else {
            localStorage.setItem("userId", user.id || user._id);
            this.router.navigate(['/employee/dashboard']);
          }
        }, 1200);
      },

      error: (err) => {
        this.openModal("Login Failed", err.error.message || "Invalid credentials");
      }
    });
  }
}
