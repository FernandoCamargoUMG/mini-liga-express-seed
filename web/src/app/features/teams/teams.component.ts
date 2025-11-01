import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.html',
  styleUrls: ['./teams.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class TeamsComponent {
  teams: any[] = [];
  teamForm: FormGroup;
  loading = false;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadTeams();
  }

  loadTeams() {
    this.loading = true;
    this.api.getTeams().subscribe({
      next: (data) => { this.teams = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addTeam() {
    if (this.teamForm.invalid) return;
    this.api.createTeam(this.teamForm.value).subscribe({
      next: () => {
        this.teamForm.reset();
        this.loadTeams();
      }
    });
  }
}