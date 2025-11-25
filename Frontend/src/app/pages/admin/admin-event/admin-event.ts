import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../core/services/event/event';
import { ConfirmationModal } from '../../../shared/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModal],
  templateUrl: './admin-event.html',
  styleUrl: './admin-event.css',
})
export class AdminEvents implements OnInit {

  today = new Date();
  events: any[] = [];
  filteredEvents: any[] = [];

  modalOpen = false;
  deleteModalOpen = false;
  isEdit = false;

  searchText = "";

  selectedEvent: any = null;

  form = {
    title: '',
    description: '',
    date: '',
    presenter:'',
    mode: '',
    location: '',
    meetingLink: '',
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  // ---------- Status Logic ----------
  isCompleted(ev: any): boolean {
    return new Date(ev.date) < this.today;
  }

  isUpcoming(ev: any): boolean {
    return new Date(ev.date) > this.today;
  }

  getStatus(ev: any): string {
    return this.isCompleted(ev) ? "Completed" : "Upcoming";
  }

  // ---------- Load Events ----------
  loadEvents() {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.data;
      this.filteredEvents = [...this.events]; // default list
    });
  }

  // ---------- SEARCH ----------
  search() {
    const q = this.searchText.toLowerCase();

    this.filteredEvents = this.events.filter((ev) =>
      ev.title.toLowerCase().includes(q) ||
      ev.mode.toLowerCase().includes(q)
    );
  }

  // ---------- Modal ----------
  openAdd() {
    this.isEdit = false;
    this.modalOpen = true;

    this.form = {
      title: '',
      description: '',
      date: '',
      presenter:'',
      mode: '',
      location: '',
      meetingLink: ''
    };
  }

  openEdit(ev: any) {
  this.isEdit = true;
  this.modalOpen = true;
  this.selectedEvent = ev;

  this.form = {
    title: ev.title,
    description: ev.description,
    date: ev.date.split("T")[0],
    presenter: ev.presenter,
    mode: ev.mode,        // already lowercase from DB
    location: ev.location,
    meetingLink: ev.meetingLink
  };
}

  closeModal() {
    this.modalOpen = false;
  }

  // ---------- Save ----------
  save() {
  const payload = {
    title: this.form.title,
    description: this.form.description,
    date: this.form.date,
    presenter: this.form.presenter,
    mode: this.form.mode.toLowerCase(),   // IMPORTANT
    location: this.form.mode === 'offline' ? this.form.location : '',
    link: this.form.mode === 'online' ? this.form?.meetingLink : ''
  };

  if (this.isEdit) {
    this.eventService.update(this.selectedEvent._id, payload)
      .subscribe(() => {
        this.closeModal();
        this.loadEvents();
      });
  } else {
    this.eventService.create(payload)
      .subscribe(() => {
        this.closeModal();
        this.loadEvents();
      });
  }
}

  // ---------- Delete ----------
  openDeleteModal(ev: any) {
    this.selectedEvent = ev;
    this.deleteModalOpen = true;
  }

  confirmDelete() {
    this.eventService.delete(this.selectedEvent._id).subscribe(() => {
      this.deleteModalOpen = false;
      this.loadEvents();
    });
  }
}
