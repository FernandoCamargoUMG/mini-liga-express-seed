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
    
    // Mock data mientras no esté el endpoint
    setTimeout(() => {
      this.matches = [
        {
          id: 1,
          home_team_id: 1,
          away_team_id: 2,
          homeTeam: { id: 1, name: 'Dragons' },
          awayTeam: { id: 2, name: 'Sharks' }
        },
        {
          id: 2,
          home_team_id: 3,
          away_team_id: 4,
          homeTeam: { id: 3, name: 'Tigers' },
          awayTeam: { id: 4, name: 'Wolves' }
        }
      ];
      this.loading = false;
    }, 1000);

    // Cuando esté el endpoint real:
    // this.api.getPendingMatches().subscribe({
    //   next: (matches) => {
    //     this.matches = matches;
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error loading matches:', error);
    //     this.loading = false;
    //   }
    // });
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
