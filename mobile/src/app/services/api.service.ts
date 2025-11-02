import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.API_URL;
  constructor(private http: HttpClient) {}
  getPendingMatches() { return this.http.get<any[]>(`${this.base}/api/matches?played=false`); } // o mock
  reportResult(id: number, payload: { home_score: number; away_score: number }) {
    return this.http.post(`${this.base}/api/matches/${id}/result`, payload);
  }
}