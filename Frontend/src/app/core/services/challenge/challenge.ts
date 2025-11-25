import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChallengeService {

  private base = "http://localhost:3000/api/challenge";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.base);
  }

  create(data: any) {
    return this.http.post(this.base, data);
  }

  markCompleted(challengeId: string, userId: string) {
    return this.http.put(`${this.base}/${challengeId}/complete/${userId}`, {});
  }
}
