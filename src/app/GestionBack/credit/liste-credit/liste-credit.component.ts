import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../../Services/CreditService/credit.service';
import { Credit } from '../../../models/credit.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-credit',
  templateUrl: './liste-credit.component.html',
  styleUrls: ['./liste-credit.component.css']
})
export class ListeCreditComponent implements OnInit {
  credits: Credit[] = []; // Stocker la liste des crédits
  errorMessage: string = ''; // Gérer les erreurs

  constructor(private creditService: CreditService, private router: Router) { }

  ngOnInit(): void {
    this.fetchCredits();
  }

  fetchCredits() {
    this.creditService.getAllCredits().subscribe(
      (data: Credit[]) => {
        this.credits = data; // Affecter les crédits reçus
      },
      (error) => {
        console.error('Erreur lors de la récupération des crédits:', error);
        this.errorMessage = 'Impossible de charger les crédits.';
      }
    );
  }

  updateCredit(id: string | undefined) {
    this.router.navigate(['/update-credit', id]); // Redirige vers la page de mise à jour avec l'ID du crédit
  }
  goToAddCredit() {
    this.router.navigate(['/AddCredit']);
  }

  deleteCredit(id: string | undefined): void {
    // Demander la confirmation avant la suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer ce crédit ?')) {
      // Appeler le service pour supprimer le crédit
      this.creditService.deleteCredit(id).subscribe(
        () => {
          // Filtrer le crédit supprimé de la liste locale
          this.credits = this.credits.filter(credit => credit.id !== id);
          console.log('Crédit supprimé avec succès');
          // Rediriger vers la liste des crédits après suppression
          this.router.navigate(['/ListeCredit']); // Redirection vers la page de la liste
        },
        (error) => {
          console.error('Erreur lors de la suppression du crédit', error);
        }
      );
    }
  }

}
