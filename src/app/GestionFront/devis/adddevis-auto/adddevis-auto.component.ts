import { Component } from '@angular/core';
import { DevisService } from '../../../Services/DevisService/devis-service.service';
import { DevisAuto, EtatDevis, TypeAssurance } from 'src/app/models/devis.model';
import { ToastService } from 'angular-toastify';
import { Offre } from 'src/app/models/devis.model';
import { OffreService } from 'src/app/Services/DevisService/offre.service';

@Component({
  selector: 'app-adddevis-auto',
  templateUrl: './adddevis-auto.component.html',
  styleUrls: ['./adddevis-auto.component.css']
})
export class AdddevisAutoComponent {
  devisAuto: DevisAuto = {
    id: null,
    montantEstime: 0,
    immatriculation: '',
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    kilometrage: 0,
    typeContrat: '',
    dateDemande: new Date(),
    typeAssurance: TypeAssurance.AUTO,
    etatDevis: EtatDevis.EN_ATTENTE
  };

  isSubmitting = false;
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];
  
  constructor(
    private devisService: DevisService,
    private offreService: OffreService,
    private _toastService: ToastService
  ) {}

  onSubmit(): void {
    this.isSubmitting = true;
    this.devisService.addDevisAuto(this.devisAuto).subscribe({
      next: (response) => {
        this.devisService.sendmail('yossra.tlili@esprit.tn',
        'Enregistrement de votre devis',
        'Bonjour chers clients, Votre demande de devis auto a bien été enregistrée, Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Auto ajouté avec succès et email envoyé!');

        this.showSuccess = true;
        this.generateOffres(response.id!);
        setTimeout(() => this.showSuccess = false, 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error("Error adding auto devis", error);
      }
    });
  }

  generateOffres(devisId: string): void {
    this.offreService.generateOffres(devisId).subscribe({
      next: (offres) => {
        this.offres = offres;
        this.showOffres = true;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Error generating offers", error);
        this.isSubmitting = false;
      }
    });
  }

  selectOffre(offre: Offre): void {
    this.offreService.saveSelectedOffre(offre).subscribe({
      next: (savedOffre) => {
        this._toastService.success(`Offre "${savedOffre.titre}" sauvegardée.`);
        console.log("Saved offer:", savedOffre);
      },
      error: (err) => {
        this._toastService.error("Erreur lors de la sauvegarde de l'offre");
        console.error(err);
      }
    });
  }
  
  

  resetForm(): void {
    this.devisAuto = {
      id: null,
      montantEstime: 0,
      immatriculation: '',
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      kilometrage: 0,
      typeContrat: '',
      dateDemande: new Date(),
      typeAssurance: TypeAssurance.AUTO,
      etatDevis: EtatDevis.EN_ATTENTE
    };
    this.showOffres = false;
    this.offres = [];
  }


}