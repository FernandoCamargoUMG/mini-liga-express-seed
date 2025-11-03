import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, LoadingController, AlertController, ToastController } from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-report-result',
  templateUrl: './report-result.page.html',
  styleUrls: ['./report-result.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, CommonModule, ReactiveFormsModule]
})
export class ReportResultPage implements OnInit {
  resultForm: FormGroup;
  matchId!: number;
  match: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.resultForm = this.formBuilder.group({
      home_score: [0, [Validators.required, Validators.min(0)]],
      away_score: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.matchId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMatchDetails();
  }

  loadMatchDetails() {
    // Obtener el partido específico del backend
    this.api.getMatch(this.matchId).subscribe({
      next: (match) => {
        if (match) {
          this.match = {
            id: match.id,
            home_team_id: match.home_team.id,
            away_team_id: match.away_team.id,
            homeTeam: { id: match.home_team.id, name: match.home_team.name },
            awayTeam: { id: match.away_team.id, name: match.away_team.name }
          };
        }
      },
      error: (error) => {
        console.error('Error loading match details:', error);
      }
    });
  }

  async submitResult() {
    if (this.resultForm.invalid || !this.match) return;

    const loading = await this.loadingCtrl.create({ message: 'Reportando resultado...' });
    await loading.present();

    try {
      await this.api.reportResult(this.matchId, this.resultForm.value).toPromise();
      await loading.dismiss();
      
      const toast = await this.toastCtrl.create({
        message: 'Resultado reportado exitosamente',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/matches']);
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo reportar el resultado.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async confirmSubmit() {
    const homeScore = this.resultForm.get('home_score')?.value;
    const awayScore = this.resultForm.get('away_score')?.value;
    
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: `${this.match?.homeTeam?.name} ${homeScore} - ${awayScore} ${this.match?.awayTeam?.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', handler: () => this.submitResult() }
      ]
    });
    await alert.present();
  }
}
