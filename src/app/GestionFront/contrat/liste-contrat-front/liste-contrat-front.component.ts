import { Component } from '@angular/core';
import {Contract} from "../../../models/contract.models";
import {ContractService} from "../../../Services/ContractService/contract.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-contrat-front',
  templateUrl: './liste-contrat-front.component.html',
  styleUrls: ['./liste-contrat-front.component.css']
})
export class ListeContratFrontComponent {
  contracts:Contract[]=[];
  errorMessage: string = '';
  constructor(private contractService: ContractService,private router: Router) { }
  ngOnInit(): void {
    this.fetchContract();
  }
  fetchContract() {
    this.contractService.getAllContract().subscribe(
      (data: Contract[]) => {
        this.contracts = data; // Affecter les crédits reçus
      },
      (error) => {
        console.error('Erreur lors de la récupération des crédits:', error);
        this.errorMessage = 'Impossible de charger les crédits.';
      }
    );
  }
}
