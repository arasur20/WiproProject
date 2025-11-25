import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgramService } from '../../../core/services/program/program-service';
import { ConfirmationModal } from '../../../shared/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-admin-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModal],
  templateUrl: './admin-program.html',
  styleUrl: './admin-program.css',
})
export class AdminPrograms implements OnInit {

  today = new Date();
  programs: any[] = [];
  filtered: any[] = [];       // ← for Search

  searchText = "";            // ← search input model

  modalOpen = false;
  deleteModalOpen = false;
  isEdit = false;

  selectedProgram: any = null;

  form = {
    title: '',
    description: '',
    category: '',
    durationWeeks: 4,
    startDate: '',
    endDate: ''
  };

  constructor(private programService: ProgramService) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programService.getAll().subscribe((res: any) => {
      this.programs = res.data;
      this.filtered = [...this.programs];   // set filtered list
    });
  }

  // 🔍 SEARCH FUNCTION
  search() {
    const q = this.searchText.toLowerCase();

    this.filtered = this.programs.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  openAdd() {
    this.isEdit = false;
    this.modalOpen = true;
    this.form = {
      title: '',
      description: '',
      category: '',
      durationWeeks: 4,
      startDate: '',
      endDate: ''
    };
  }

  openEdit(p: any) {
    this.isEdit = true;
    this.modalOpen = true;

    this.form = {
      title: p.title,
      description: p.description,
      category: p.category,
      durationWeeks: p.durationWeeks,
      startDate: p.startDate?.split("T")[0],
      endDate: p.endDate?.split("T")[0]
    };

    this.selectedProgram = p;
  }

  closeModal() {
    this.modalOpen = false;
  }

  save() {
    const payload = { ...this.form };

    if (this.isEdit) {
      this.programService.update(this.selectedProgram._id, payload)
        .subscribe(() => {
          this.closeModal();
          this.loadPrograms();
        });
    } else {
      this.programService.create(payload)
        .subscribe(() => {
          this.closeModal();
          this.loadPrograms();
        });
    }
  }

  openDeleteModal(p: any) {
    this.selectedProgram = p;
    this.deleteModalOpen = true;
  }

  confirmDelete() {
    this.programService.delete(this.selectedProgram._id)
      .subscribe(() => {
        this.deleteModalOpen = false;
        this.loadPrograms();
      });
  }

  // STATUS CHECKS
  isCompleted(p: any) {
    return new Date(p.endDate) < this.today;
  }

  isOngoing(p: any) {
    return new Date(p.startDate) <= this.today && this.today <= new Date(p.endDate);
  }

  isUpcoming(p: any) {
    return new Date(p.startDate) > this.today;
  }
}
