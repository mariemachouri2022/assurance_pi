import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Offre, TypeLogement } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';
import { OffreService } from 'src/app/Services/DevisService/offre.service';

@Component({
  selector: 'app-habitation-form',
  templateUrl: './habitation-form.component.html',
  styleUrls: ['./habitation-form.component.css']
})
export class HabitationFormComponent {
  devisForm: FormGroup;
  typeLogementOptions = Object.values(TypeLogement);
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];

  constructor(
    private fb: FormBuilder,
    private devisService: DevisService,
    private router: Router , private _toastService: ToastService , private offreService: OffreService
  ) {
    this.devisForm = this.fb.group({
      surface: ['', [Validators.required, Validators.min(1)]],
      typeLogement: ['', Validators.required],
      valeurBien: ['', [Validators.required, Validators.min(0)]],
      niveauRisque: ['MOYEN', Validators.required],
      alarmeSecurite: [false],
      montantEstime: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.devisForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = {
      ...this.devisForm.value,
      typeAssurance: 'HABITATION',
      etatDevis: 'EN_ATTENTE',
      dateDemande: new Date().toISOString()
    };

    this.devisService.addDevisHabitation(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis Habitation a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Habitation ajouté avec succès et email envoyé!');
        this.successMessage = 'Devis habitation créé avec succès!';
        this.showSuccess = true; 
        setTimeout(() => this.showSuccess = false, 3000);
        this.generateOffres(response.id!);
        this.devisForm.reset();
        
        setTimeout(() => {
          this.router.navigate(['/acceuil-devis']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création du devis';
        console.error('Error details:', err);
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