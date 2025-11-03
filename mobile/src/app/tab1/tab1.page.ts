import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, IonRefresher, IonRefresherContent, IonBadge } from '@ionic/angular/standalone';
import { RefresherCustomEvent } from '@ionic/angular';
import { ApiService, Match } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, IonRefresher, IonRefresherContent, IonBadge, CommonModule],
})
export class Tab1Page implements OnInit {
  matches: Match[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.loading = true;
    
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
  }

  doRefresh(event: RefresherCustomEvent) {
    this.loadMatches();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  trackByMatchId(index: number, match: Match): number {
    return match.id;
  }

  reportResult(matchId: number) {
    this.router.navigate(['/report-result', matchId]);
  }
}
