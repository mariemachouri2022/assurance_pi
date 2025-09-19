import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { DevisVoyage, Destination, TrancheAge, ZoneGeographique, TypeAssurance, EtatDevis, Offre } from 'src/app/models/devis.model';
import { OffreService } from 'src/app/Services/DevisService/offre.service';
import { DevisService } from '../../../Services/DevisService/devis-service.service';

@Component({
  selector: 'app-voyage-form',
  templateUrl: './voyage-form.component.html',
  styleUrls: ['./voyage-form.component.css']
})
export class VoyageFormComponent implements OnInit {
  devisForm: FormGroup = this.fb.group({}); // Solution 1
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];
  

  // Enum values for dropdowns
  destinations = Object.values(Destination).filter(v => typeof v === 'string') as string[];
  tranchesAge = Object.values(TrancheAge).filter(v => typeof v === 'string') as string[];
  zones = Object.values(ZoneGeographique).filter(v => typeof v === 'string') as string[];

  constructor(
    private fb: FormBuilder,
    private devisService: DevisService,
    private _toastService: ToastService ,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.devisForm = this.fb.group({
      dureeContrat: [7, [Validators.required, Validators.min(1)]],
      dateDepart: [tomorrow.toISOString().substring(0, 10), Validators.required],
      dateRetour: [nextWeek.toISOString().substring(0, 10), Validators.required],
      destination: [Destination.FRANCE, Validators.required],
      trancheAge: [TrancheAge.DE_1_A_60_ANS, Validators.required],
      zoneGeographique: [ZoneGeographique.EUROPE, Validators.required],
      montantEstime: [0, [Validators.required, Validators.min(0)]],
      typeAssurance: [TypeAssurance.VOYAGE],
      etatDevis: [EtatDevis.EN_ATTENTE]
    });
  }

  onSubmit() {
    if (this.devisForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formData = this.devisForm.value as DevisVoyage;

    this.devisService.addDevisVoyage(formData).subscribe({
      next: (response) => { 
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis Voyage a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Voyage ajouté avec succès et email envoyé!');
        this.successMessage = 'Devis created successfully!';
         this.showSuccess = true; 
        setTimeout(() => this.showSuccess = false, 3000);
        this.generateOffres(response.id!);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error: ' + err.message;
        this.isLoading = false;
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

}
