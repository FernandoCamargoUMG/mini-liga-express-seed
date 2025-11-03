import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, IonRefresher, IonRefresherContent, IonBadge } from '@ionic/angular/standalone';
import { RefresherCustomEvent } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, IonRefresher, IonRefresherContent, IonBadge, CommonModule, FormsModule]
})
export class MatchesPage implements OnInit {
  matches: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.loading = true;
    
    // Usar partidos reales del backend
    this.api.getPendingMatches().subscribe({
      next: (matches) => {
        this.matches = matches.map((match: any) => ({
          id: match.id,
          home_team_id: match.home_team.id,
          away_team_id: match.away_team.id,
          homeTeam: { id: match.home_team.id, name: match.home_team.name },
          awayTeam: { id: match.away_team.id, name: match.away_team.name }
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading matches:', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: RefresherCustomEvent) {
    this.loadMatches();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  trackByMatchId(index: number, match: any): number {
    return match.id;
  }

  reportResult(matchId: number) {
    this.router.navigate(['/report-result', matchId]);
  }
}
