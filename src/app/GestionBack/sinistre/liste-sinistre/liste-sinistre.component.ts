import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SinistreService } from '../../../Services/SinistreService/sinistre.service';
import { Sinistre } from '../../../models/sinistre.model';

@Component({
  selector: 'app-liste-sinistre',
  templateUrl: './liste-sinistre.component.html',
  styleUrls: ['./liste-sinistre.component.css']
})
export class ListeSinistreComponent {
  sinistres: Sinistre[] = []; // Stocker la liste des sinistres
  errorMessage: string = ''; // Gérer les erreurs

  constructor(private sinistreService: SinistreService, private router: Router) { }

  ngOnInit(): void {
    this.fetchSinistres();
  }

  fetchSinistres() {
    this.sinistreService.getAllSinistre().subscribe(
      (data: Sinistre[]) => {
        this.sinistres = data; // Affecter les sinistres reçus
      },
      (error) => {
        console.error('Erreur lors de la récupération des sinistres:', error);
        this.errorMessage = 'Impossible de charger les sinistres.';
      }
    );
  }
  goToAddSinistre() {
    this.router.navigate(['/AddSinistre']);
  }
  updateSinistre(id: string | undefined) {
    this.router.navigate(['/UpdateSinistre', id]); // Redirige vers la page de mise à jour avec l'ID du crédit
  }

  deleteSinistre(id: string | undefined): void {
    // Demander la confirmation avant la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sinistre ?')) {
      // Appeler le service pour supprimer le sinistre
      this.sinistreService.deleteSinistre(id).subscribe(
        () => {
          // Filtrer le sinistre supprimé de la liste locale
          this.sinistres = this.sinistres.filter(sinistre => sinistre.id !== id);
          console.log('Sinistre supprimé avec succès');
          // Rediriger vers la liste des sinistres après suppression
          this.router.navigate(['/sinistre']); // Redirection vers la page de la liste
        },
        (error) => {
          console.error('Erreur lors de la suppression du sinistre', error);
        }
      );
    }
  }




}
