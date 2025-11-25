import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  imports: [CommonModule],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class Event implements OnInit{
   events: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  const userId = localStorage.getItem("userId");

  this.http.get(`http://localhost:3000/api/events?userId=${userId}`)
    .subscribe((res: any) => {
      const today = new Date().setHours(0,0,0,0);

      this.events = res.data.map((e: any) => {
        const eventDate = new Date(e.date).setHours(0,0,0,0);

        return {
          ...e,
          isExpired: eventDate < today,
          isCompletedForUser: e.isRegistered && eventDate < today
        };
      });
    });
}

openEvent(id: string, event: any) {
  if (event.isExpired) return; // prevent navigation

  this.router.navigate(['/employee/event', id]);
}

}
