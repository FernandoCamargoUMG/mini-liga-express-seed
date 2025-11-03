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
  // Lista partidos pendientes
  getPendingMatches() { 
    
    return this.http.get<any>(`${this.base}/api/matches?played=false`).pipe(
      map(response => response.matches || response)
    );
  }

  // Obtiene un partido específico
  getMatch(id: number) {
    return this.getPendingMatches().pipe(
      map(matches => matches.find((match: any) => match.id === id))
    );
  }
  // Reporta resultado
  reportResult(id: number, payload: { home_score: number; away_score: number }) {
    return this.http.post(`${this.base}/api/matches/${id}/result`, payload);
  }
}