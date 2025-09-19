import {Component, OnInit} from '@angular/core';
import {Credit, EtatCredit, TypeCredit} from "../../../models/credit.model";
import {CreditService} from "../../../Services/CreditService/credit.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-credit',
  templateUrl: './update-credit.component.html',
  styleUrls: ['./update-credit.component.css']
})
export class UpdateCreditComponent implements OnInit {
  credit: Credit = {
    montant: 0,
    tauxInteret: 0,
    duree: 0,
    typeCredit: TypeCredit.CONSOMMATION,
    etatCredit: EtatCredit.ENCOURS,
    historiquePaiements: ''
  };

  typeCreditOptions = Object.values(TypeCredit);
  etatCreditOptions = Object.values(EtatCredit);

  constructor(
    private creditService: CreditService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.creditService.getAllCredits().subscribe((credits) => {
        const foundCredit = credits.find((c) => c.id === id);
        if (foundCredit) {
          this.credit = foundCredit;
        }
      });
    }
  }

  onUpdate(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.creditService.updateCredit(id, this.credit).subscribe(
        (response) => {
          console.log('Crédit mis à jour avec succès !', response);
          this.router.navigate(['/ListeCredit']); // Redirection après mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du crédit', error);
        }
      );
    }
  }}
