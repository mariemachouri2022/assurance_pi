import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevisService } from '../../../Services/DevisService/devis-service.service';
import { DevisEcolia, TypeIdentite, EtatDevis, TypeAssurance } from 'src/app/models/devis.model'; // Import nécessaire
import { ToastService } from 'angular-toastify';
import { Offre } from 'src/app/models/devis.model';
import { OffreService } from 'src/app/Services/DevisService/offre.service';



@Component({
  selector: 'app-adddevis-ecolia',
  templateUrl: './adddevis-ecolia.component.html',
  styleUrls: ['./adddevis-ecolia.component.css']
})
export class AdddevisEcoliaComponent {
  typeIdentiteOptions = Object.values(TypeIdentite); 
  
  devisEcolia: DevisEcolia = {
    id: null,
    parentTuteurNom: '',
    parentTuteurPieceIdentite: TypeIdentite.CIN,
    parentTuteurNumPieceIdentite: '',
    parentTuteurTelephone: '',
    parentTuteurEmail: '',
    nombreEnfants: 0,
    dateEffet: new Date(),
    typeAssurance: TypeAssurance.ECOLIA, // Valeur par défaut
    etatDevis: EtatDevis.EN_ATTENTE, // Valeur par défaut
    montantEstime: 0, // Ajoutez une valeur par défaut
    
  };
  router: any;

  isSubmitting = false;
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];

  constructor(private http: HttpClient, private devisService: DevisService , private _toastService: ToastService, private offreService: OffreService) {}

  onSubmit(): void {
    console.log("Devis from form: "+this.devisEcolia)
    this.devisService.addDevisEcolia(this.devisEcolia).subscribe({
      
      next: (response) => {
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis écolia a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Ecolia ajouté avec succès et email envoyé!');
        this.showSuccess = true; //yossra zid hedhom (offre generation)
        this.generateOffres(response.id!); //yossra zid hedhom (offre generation) -> DONT FORGET THE IMPORT, and constructor, and variables

        setTimeout(() => this.showSuccess = false, 3000);
        console.log('Devis Ecolia ajouté avec succès', response);
        this.resetForm(); // Réinitialiser le formulaire après soumission
      },
      error: (error: any) => {
        console.error("Erreur lors de l'ajout du devis Ecolia", error);
      }
    });
  }


  generateOffres(devisId: string): void {
    //console.log('entered generateOffres inside ecolia');

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
    //console.log('entered selectOffre inside ecolia');

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
    this.devisEcolia = {
      id: null,
      parentTuteurNom: '',
      parentTuteurPieceIdentite: TypeIdentite.CIN,
      parentTuteurNumPieceIdentite: '',
      parentTuteurTelephone: '',
      parentTuteurEmail: '',
      nombreEnfants: 0,
      dateEffet: new Date(),
      typeAssurance: TypeAssurance.ECOLIA,
      etatDevis: EtatDevis.EN_ATTENTE,
      montantEstime: 0, // Réinitialisez à la valeur par défaut
      
    };
  }

  navigateToEcoliaForm() {
    this.router.navigate(['/EcoliaForm']);
  }
  
}
