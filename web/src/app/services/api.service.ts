import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.API_URL;
  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get<any[]>(`${this.base}/api/teams`);
  }

  createTeam(payload: { name: string }) {
    return this.http.post(`${this.base}/api/teams`, payload);
  }

  getStandings() {
    return this.http.get<any[]>(`${this.base}/api/standings`);
  }
}
