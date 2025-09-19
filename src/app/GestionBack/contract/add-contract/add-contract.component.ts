import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ContractService} from "../../../Services/ContractService/contract.service";
import { Contract } from 'src/app/models/contract.models';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent {
  contractForm: FormGroup;


  constructor(private fb: FormBuilder,
              private contractService: ContractService,
              private router: Router) {
    this.contractForm = this.fb.group({
      produitAssuranceId: [0, Validators.required], // ID du produit d'assurance
      statut: ['VALIDE', Validators.required], // Statut par défaut "VALIDE"
      montantMensuel: [0, [Validators.required, Validators.min(1)]], // Montant minimum 1
      typeAssurance: ['SANTE', Validators.required] // Type d'assurance (ex: "SANTE", "VIE")
    });
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const newContract = {
        ...this.contractForm.value,
        _class: 'com.maghebia.Contract.Contract' // Ajout automatique du champ _class
      };

      console.log('Données envoyées :', newContract); // Vérification console

      this.contractService.addContract(newContract).subscribe(response => {
        console.log('Contrat ajouté avec succès :', response);
        this.router.navigate(['/ListeContrat']);
      }, error => {
        console.error('Erreur lors de l\'ajout du contrat', error);
      });
    }
  }
}
