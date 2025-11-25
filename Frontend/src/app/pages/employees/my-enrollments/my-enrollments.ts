import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-my-enrollments',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './my-enrollments.html',
  styleUrls: ['./my-enrollments.css']
})
export class MyEnrollments implements OnInit {

  enrollments: any[] = [];
  isLoaded = false;

  // Modal
  isOpen = false;
  title = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadEnrollments();
  }

  // Modal handling
  openModal(title: string, msg: string) {
    this.title = title;
    this.message = msg;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  // Load enrollments
  loadEnrollments() {
    const userId = localStorage.getItem("userId");

    this.http
      .get(`http://localhost:3000/api/enrollment/my?userId=${userId}`)
      .subscribe({
        next: (res: any) => {
          this.enrollments = res.data;
          this.isLoaded = true;
        },
        error: () => {
          this.isLoaded = true;
        }
      });
  }

  openProgram(id: string) {
    this.router.navigate(['/employee/program', id]);
  }

  withdraw(enrollmentId: string) {
    this.http
      .delete(`http://localhost:3000/api/enrollment/${enrollmentId}`)
      .subscribe({
        next: () => {
          this.openModal('Successfully Withdrawn', 'You have withdrawn from the program.');
          this.loadEnrollments();
        },
        error: () => {
          this.openModal('Failed to Withdraw', 'Something went wrong.');
        }
      });
  }
}
