import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-enrollment.html',
  styleUrl: './admin-enrollment.css',
})
export class AdminEnrollment implements OnInit {

  programs: any[] = [];
  enrolledUsers: any[] = [];   // ⭐ matches your HTML

  selectedProgram: any = null;
  showList = false;            // ⭐ needed for switching screens

  progressModalOpen = false;
  selectedEnrollment: any = null;
  progressValue = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('http://localhost:3000/api/programs')
      .subscribe((res: any) => {
        this.programs = res.data;
      });
  }

  openProgram(program: any) {
    this.selectedProgram = program;
    this.showList = true;    // ⭐ show employee list

    this.http.get(`http://localhost:3000/api/enrollment/program/${program._id}`)
      .subscribe((res: any) => {
        this.enrolledUsers = res.data;  // ⭐ correct field
      });
  }

  goBack() {
    this.showList = false;     // ⭐ return to program list
    this.selectedProgram = null;
    this.enrolledUsers = [];
  }

  openProgressModal(emp: any) {
    this.selectedEnrollment = emp;
    this.progressValue = emp.progressPercentage || 0;
    this.progressModalOpen = true;
  }

  closeProgressModal() {
    this.progressModalOpen = false;
  }

  updateProgress() {
    const programId = this.selectedProgram._id;
    const userId = this.selectedEnrollment.user._id;

    this.http.put(
      `http://localhost:3000/api/enrollment/program/${programId}/user/${userId}`,
      { progressPercentage: this.progressValue }
    )
    .subscribe(() => {
      this.closeProgressModal();
      this.openProgram(this.selectedProgram);  // reload updated list
    });
  }
}
