import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-my-profile',
  imports: [FormsModule, ModalComponent],
  providers: [Auth],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile implements OnInit {

  user: any = {};
  form: any = {};

  // Modal variables
  isOpen = false;
  title = '';
  message = '';

  calculatedAge: number | null = null; // <-- Auto Age UI

  constructor(private auth: Auth, private router: Router) {}

  // Open modal
  openModal(title: string, msg: string) {
    this.title = title;
    this.message = msg;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  ngOnInit() {
  const savedUser = localStorage.getItem('user');

  if (!savedUser) {
    this.router.navigate(['/login']);
    return;
  }

  this.user = JSON.parse(savedUser);

  // LOAD DOB properly (FIX)
  const dob = this.user.dob ? this.user.dob.split("T")[0] : "";

  // FORM INITIALIZATION
  this.form = {
    name: this.user.name || '',
    department: this.user.department || '',
    dob: dob,                     // PRE-FILL CORRECT DOB
    bloodGroup: this.user.bloodGroup || '',
    physicalState: this.user.physicalState || '',
    gymMember: this.user.gymMember || '',
    therapySupport: this.user.therapySupport || ''
  };

  // AUTO AGE CALC
  if (dob) {
    this.calculateAge(dob);
  }
}

// AGE CALCULATOR
calculateAge(dob: string) {
  if (!dob) {
    this.calculatedAge = null;
    return;
  }

  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  this.calculatedAge = age;
}


  // AUTO CALCULATE AGE FROM DOB

  updateProfile() {
    const allowed = {
      name: this.form.name,
      department: this.form.department,
      dob: this.form.dob,
      bloodGroup: this.form.bloodGroup,
      physicalState: this.form.physicalState,
      gymMember: this.form.gymMember,
      therapySupport: this.form.therapySupport,
    };

    const userId = this.user._id || this.user.id;

    this.auth.updateProfile(userId, allowed).subscribe({
      next: (res: any) => {
        this.openModal("Profile Updated", "Your profile has been successfully updated.");

        // Save updated user
        localStorage.setItem("user", JSON.stringify(res.user));

        setTimeout(() => {
          this.isOpen = false;
          this.router.navigate(['/employee/dashboard']);
        }, 1200);
      },

      error: (err) => {
        this.openModal("Update Failed", err.error?.message || "Unable to update profile");
      }
    });
  }
}
