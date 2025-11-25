import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { EmployeeService } from '../../../core/services/employees/employees';
import { ConfirmationModal } from '../../../shared/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModal],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.css',
})
export class AdminEmployees implements OnInit {
  employees: any[] = [];
  filtered: any[] = [];
  searchEmail = '';


  deleteModalOpen = false;
  selectedEmployee: any = null;


  editData: any = null;

  constructor(private employeeService: EmployeeService, private http: HttpClient) {}

  ngOnInit() {
    this.loadEmployees();
  }

  // Load all employees
  loadEmployees() {
    this.employeeService.getAll().subscribe((res: any) => {
      this.employees = res.data;
      this.filtered = [...this.employees];
    });
  }

  // Search by email
  search() {
    const query = this.searchEmail.toLowerCase();
    this.filtered = this.employees.filter((e) =>
      e.email.toLowerCase().includes(query)
    );
  }


  openDeleteModal(emp: any) {
    this.selectedEmployee = emp;
    this.deleteModalOpen = true;
  }

  // Confirm Delete
  confirmDelete() {
    this.employeeService.delete(this.selectedEmployee._id).subscribe(() => {
      this.deleteModalOpen = false;
      this.loadEmployees();
    });
  }

  // Edit employee
  openEdit(emp: any) {
    this.editData = { ...emp };
    if (this.editData.dob) {
      this.editData.dob = this.editData.dob.split('T')[0];
    }
  }

  closeEdit() {
    this.editData = null;
  }

  saveEdit() {
    this.employeeService.update(this.editData._id, this.editData).subscribe(() => {
      this.closeEdit();
      this.loadEmployees();
    });
  }

  goBack() {
  window.history.back();
}
}
