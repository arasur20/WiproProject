import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../../shared/modal/modal';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit {

  event: any = null;
  id = '';

  // Modal variables
  isOpen = false;
  title = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  openModal(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadEvent();
  }

  // Load event + check if user is already registered
  loadEvent() {
  const userId = localStorage.getItem('userId');

  this.http
    .get(`http://localhost:3000/api/events/${this.id}?userId=${userId}`)
    .subscribe((res: any) => {
      this.event = res.data;

      // ensure boolean exists
      this.event.isRegistered = res.data.isRegistered || false;

      console.log("EVENT DETAILS LOADED:", this.event);
    });
}

  // Register user for the event
  register() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.openModal("Login Required", "Please login to register for this event.");
      setTimeout(() => this.router.navigate(['/login']), 1000);
      return;
    }

    this.http
      .post(`http://localhost:3000/api/events/register`, {
        userId,
        eventId: this.id,
      })
      .subscribe({
        next: () => {
          this.openModal("Registration Successful", "You are now registered!");
          // Update UI
          this.event.isRegistered = true;
        },
        error: (err) => {
          this.openModal("Registration Failed", err.error.message || "Something went wrong");
        },
      });
  }
}
