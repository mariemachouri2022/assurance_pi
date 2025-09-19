import { Component } from '@angular/core';
import {Credit} from "../../../models/credit.model";
import {CreditService} from "../../../Services/CreditService/credit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-affichage-credit',
  templateUrl: './affichage-credit.component.html',
  styleUrls: ['./affichage-credit.component.css']
})
export class AffichageCreditComponent {
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

  allerAuFormulaire(id: string | undefined) {
    this.router.navigate(['/shops']); // Redirige vers la page du formulaire avec l'ID du crédit
  }

}
