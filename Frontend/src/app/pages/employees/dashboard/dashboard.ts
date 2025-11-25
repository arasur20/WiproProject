import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, ModalComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  isOpen = false;
  title = '';
  message = '';


  user: any = null;
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  openModal(title: string, msg: string) {
    this.title = title;
    this.message = msg;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  help(){
    this.openModal("Contact Admin", "admin0123@gmail.com")
  }
}
