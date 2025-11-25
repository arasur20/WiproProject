import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout {
  adminName = 'Admin';

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      this.adminName = user.name || 'Admin';
    }
  }

  goToProfile() {
    this.router.navigate(['/admin/my-profile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
