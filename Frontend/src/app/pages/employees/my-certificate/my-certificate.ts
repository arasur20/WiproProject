import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-certificate.html',
  styleUrl: './my-certificate.css'
})
export class Certificates implements OnInit {

  certificates: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem("userId");

    this.http.get(`http://localhost:3000/api/enrollment/my?userId=${userId}`)
      .subscribe((res: any) => {
        this.certificates = res.data.filter(
          (e: any) => e.progressPercentage === 100
        );
      });
  }
}
