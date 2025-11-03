import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.API_URL;
  constructor(private http: HttpClient) {}
  
  getTeams() { 
    return this.http.get<any[]>(`${this.base}/api/teams`); 
  }
  
  getPendingMatches() { 
    // Usar el endpoint real del backend
    return this.http.get<any>(`${this.base}/api/matches?played=false`).pipe(
      map(response => response.matches || response)
    );
  }
  
  getMatch(id: number) {
    // Obtener un partido específico desde los partidos pendientes
    return this.getPendingMatches().pipe(
      map(matches => matches.find((match: any) => match.id === id))
    );
  }
  
  reportResult(id: number, payload: { home_score: number; away_score: number }) {
    return this.http.post(`${this.base}/api/matches/${id}/result`, payload);
  }
}