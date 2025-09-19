import { Component } from '@angular/core';
import {Credit, EtatCredit, TypeCredit} from "../../../models/credit.model";
import {HttpClient} from "@angular/common/http";
import {CreditService} from "../../../Services/CreditService/credit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent {
  credit: Credit = {
    montant: 0,
    tauxInteret: 0,
    duree: 0,
    typeCredit: TypeCredit.CONSOMMATION, // Valeur par défaut
    etatCredit: EtatCredit.ENCOURS, // Valeur par défaut
    historiquePaiements: '',
    scoreRisque: 0 // Ajout d'une valeur par défaut
  };
  typeCreditOptions = Object.values(TypeCredit);
  etatCreditOptions = Object.values(EtatCredit);

  constructor(private http: HttpClient, private userService: CreditService , public router: Router
  ) {}

  onSubmit(): void {
    // Ici, vous pouvez appeler votre service pour enregistrer le crédit
    this.userService.addCredit(this.credit).subscribe({
      next: (response) => {
        console.log('Crédit ajouté avec succès', response);
        this.router.navigate(['/ListeCredit']); // Redirection après mise à jour
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du crédit', error);
      }
    });
  }}
