import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenges.html',
  styleUrl: './challenges.css'
})
export class Challenge implements OnInit {

  challenges: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.http.get(`http://localhost:3000/api/challenge/user/${userId}`)
      .subscribe((res: any) => {
        this.challenges = res.data;
      });
  }
  markComplete(ch: any) {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert("User ID not found");
    return;
  }

  this.http.put(`http://localhost:3000/api/challenge/${ch._id}/complete/${userId}`, {})
    .subscribe({
      next: () => {
        ch.isCompleted = true;
        alert("Challenge marked as completed!");
      },
      error: (err) => {
        console.error("Error marking complete", err);
      }
    });
}


}
