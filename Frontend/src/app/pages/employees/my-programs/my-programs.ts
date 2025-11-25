import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-programs',
  imports: [],
  templateUrl: './my-programs.html',
  styleUrl: './my-programs.css',
})
export class MyPrograms implements OnInit {
  programs: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
  const userId = localStorage.getItem("userId");

  this.http.get(`http://localhost:3000/api/programs?userId=${userId}`)
    .subscribe((res: any) => {
      this.programs = res.data;
    });
}

  openProgram(program: any) {
  if (program.isExpired) return;
  this.router.navigate(['/employee/program', program._id]);
}
}
