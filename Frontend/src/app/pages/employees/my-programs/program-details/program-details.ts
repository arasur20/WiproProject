import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../../shared/modal/modal';

@Component({
  selector: 'app-program-details',
  imports: [CommonModule, ModalComponent],
  templateUrl: './program-details.html',
  styleUrl: './program-details.css',
})
export class ProgramDetails implements OnInit {

  program: any = null;
  programId: string = '';

  // Modal
  isOpen = false;
  title = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.programId = this.route.snapshot.params['id'];
    this.loadProgram();
  }

  openModal(t: string, m: string) {
    this.title = t;
    this.message = m;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  loadProgram() {
    const userId = localStorage.getItem('userId');

    this.http.get(
      `http://localhost:3000/api/programs/${this.programId}?userId=${userId}`
    )
    .subscribe((res: any) => {
      this.program = res.data;
      console.log("PROGRAM LOADED FIXED:", this.program);
    });
  }

  enroll() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.openModal("Login Required", "Please login to enroll.");
      setTimeout(() => this.router.navigate(['/login']), 1200);
      return;
    }

    const payload = {
      programId: this.programId,
      userId
    };

    this.http.post("http://localhost:3000/api/enrollment", payload)
      .subscribe({
        next: () => {
          this.openModal("Enrolled Successfully", "You are enrolled in this program.");
          this.program.isEnrolled = true;
        },
        error: (err) => {
          this.openModal("Enrollment Failed", err.error.message || "Unable to enroll");
        }
      });
  }
}
