import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  templateUrl: './standings.html',
  styleUrls: ['./standings.scss'],
  imports: [CommonModule]
})
export class StandingsComponent {
  standings: any[] = [];
  loading = false;

  constructor(private api: ApiService) {
    this.loadStandings();
  }

  loadStandings() {
    this.loading = true;
    this.api.getStandings().subscribe({
      next: (data) => { this.standings = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}