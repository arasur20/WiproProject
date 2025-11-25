import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-admin-challenges',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './admin-challenge.html',
  styleUrl: './admin-challenge.css'
})
export class AdminChallenge implements OnInit {

  challenges: any[] = [];
  programs: any[] = [];

  modalOpen = false;
  deleteModalOpen = false;
  isEdit = false;

  selectedChallenge: any = null;

  form = {
    title: '',
    description: '',
    programId: '',
    difficulty: 'Easy'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChallenges();
    this.loadPrograms();
  }

  loadChallenges() {
    this.http.get('http://localhost:3000/api/challenge')
      .subscribe((res: any) => {
        this.challenges = res.data;
      });
  }

  loadPrograms() {
    this.http.get('http://localhost:3000/api/programs')
      .subscribe((res: any) => {
        this.programs = res.data;
      });
  }

  openAdd() {
    this.isEdit = false;
    this.modalOpen = true;
    this.form = {
      title: '',
      description: '',
      programId: '',
      difficulty: 'Easy'
    };
  }

  openEdit(ch: any) {
    this.isEdit = true;
    this.modalOpen = true;
    this.form = {
      title: ch.title,
      description: ch.description,
      programId: ch.programId._id,
      difficulty: ch.difficulty
    };
    this.selectedChallenge = ch;
  }

  closeModal() {
    this.modalOpen = false;
  }

  save() {
    if (this.isEdit) {
      this.http.put(`http://localhost:3000/api/challenge/${this.selectedChallenge._id}`,
        this.form
      ).subscribe(() => {
        this.closeModal();
        this.loadChallenges();
      });

    } else {
      this.http.post(`http://localhost:3000/api/challenge`, this.form)
        .subscribe(() => {
          this.closeModal();
          this.loadChallenges();
        });
    }
  }

  openDeleteModal(ch: any) {
    this.selectedChallenge = ch;
    this.deleteModalOpen = true;
  }

  confirmDelete() {
    this.http.delete(`http://localhost:3000/api/challenge/${this.selectedChallenge._id}`)
      .subscribe(() => {
        this.deleteModalOpen = false;
        this.loadChallenges();
      });
  }
}
