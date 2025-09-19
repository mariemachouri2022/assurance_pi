import {Component, OnInit} from '@angular/core';
import {Contract} from "../../../models/contract.models";
import {ContractService} from "../../../Services/ContractService/contract.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-contract',
  templateUrl: './liste-contract.component.html',
  styleUrls: ['./liste-contract.component.css']
})
export class ListeContractComponent implements OnInit {
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
  goToAddContract() {
    this.router.navigate(['/AddContrat']);
  }

  deleteContract(id?: string): void {
    if (!id) {
      console.error("L'ID du contrat est invalide !");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce contrat ?")) {
      this.contractService.deleteContract(id).subscribe(() => {
        this.contracts = this.contracts.filter(contract => contract.id !== id);
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }

}
