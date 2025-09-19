import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevisService } from '../../../Services/DevisService/devis-service.service';
import { DevisBase, TypeAssurance, EtatDevis } from 'src/app/models/devis.model'; // Assurez-vous d'importer EtatDevis

@Component({
  selector: 'app-add-devis',
  templateUrl: './add-devis.component.html',
  styleUrls: ['./add-devis.component.css']
})
export class AddDevisComponent {
  successMessage: string = ''; // Déclare la propriété successMessage
  devis: DevisBase = {
    id: '',
    montantEstime: 0,
    dateDemande: new Date(),
    typeAssurance: TypeAssurance.HABITATION, // Assignez une valeur par défaut valide
    etatDevis: EtatDevis.EN_ATTENTE // Assignez une valeur par défaut pour etatDevis
  };

  constructor(private http: HttpClient, private devisService: DevisService) {}

  onSubmit(): void {
    this.successMessage = "Devis ajouté avec succès !";
    this.devisService.addDevis(this.devis).subscribe({
      next: (response) => {
        console.log('Devis ajouté avec succès', response);
        // Réinitialiser le formulaire ou rediriger l'utilisateur
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du devis", error);
      }
    });
  }

  resetForm(): void {
    this.devis = {
      id: '',
      montantEstime: 0,
      dateDemande: new Date(),
      typeAssurance: TypeAssurance.HABITATION, // Réinitialiser avec une valeur valide
      etatDevis: EtatDevis.EN_ATTENTE // Réinitialiser avec une valeur valide pour etatDevis
    };
  }
}
