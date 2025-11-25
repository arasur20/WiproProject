import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Get user role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  updateProfile(id: string, data: any) {
  return this.http.put(`http://localhost:3000/api/profile/update/${id}`, data);
}



}
