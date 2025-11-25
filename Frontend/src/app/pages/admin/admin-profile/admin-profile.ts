import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile implements OnInit {

  form = {
    name: '',
    email: '',
    password: '',
    department: ''
  };

  // MODAL CONTROL
  isOpen = false;
  title = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const adminId = localStorage.getItem('adminId');

    this.http.get(`http://localhost:3000/api/admin/profile/${adminId}`)
      .subscribe((res: any) => {
        this.form.name = res.data.name;
        this.form.email = res.data.email;
        this.form.department = res.data.department || '';
      });
  }

  save() {
    const adminId = localStorage.getItem('adminId');

    this.http.put(`http://localhost:3000/api/admin/profile/${adminId}`, this.form)
      .subscribe(() => {
        this.openModal("Profile Updated", "Your profile changes have been saved.");
      });
  }

  // OPEN MODAL
  openModal(t: string, msg: string) {
    this.title = t;
    this.message = msg;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    window.history.back()
  }
}
