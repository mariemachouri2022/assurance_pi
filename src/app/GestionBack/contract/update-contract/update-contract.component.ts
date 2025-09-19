import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../../Services/ContractService/contract.service";
import {Contract} from "../../../models/contract.models";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css']
})
export class UpdateContractComponent implements OnInit {
  contract: Contract = {
    ClientId: '',
    ProduitAssuranceId: 0,
    statut: '',
    montantMensuel: 0,
    typeAssurance: ''
  };
  constructor(
    private contractService: ContractService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contractService.getContractById(id).subscribe(data => {
        this.contract = data;
      });
    }

  }
  updateContract(): void {
    if (!this.contract.id) return;

    this.contractService.updateContract(this.contract.id, this.contract).subscribe(() => {
      alert('Contrat mis à jour avec succès !');
      this.router.navigate(['/ListeContrat']); // Redirige vers la liste des contrats
    }, error => {
      console.error('Erreur lors de la mise à jour', error);
    });
  }

}
