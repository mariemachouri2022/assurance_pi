import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Offre, TypeContrat } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';
import { OffreService } from 'src/app/Services/DevisService/offre.service';

@Component({
  selector: 'app-vie-form',
  templateUrl: './vie-form.component.html',
  styleUrls: ['./vie-form.component.css']
})
export class VieFormComponent {
  devisForm: FormGroup;
  typeContratOptions = Object.values(TypeContrat);
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
    private router: Router ,private _toastService: ToastService ,  private offreService: OffreService
  ) {
    this.devisForm = this.fb.group({
      typeContrat: ['', Validators.required],
      primeMensuelle: ['', [Validators.required, Validators.min(100)]],
      beneficiaire: ['', [Validators.required, Validators.minLength(3)]],
      rendementEspere: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      dureeMinimale: ['', [Validators.required, Validators.min(1)]],
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
      typeAssurance: 'VIE',
      etatDevis: 'EN_ATTENTE',
      dateDemande: new Date().toISOString()
    };

    this.devisService.addDevisVie(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis Vie a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Vie ajouté avec succès et email envoyé!');
        this.successMessage = 'Devis vie créé avec succès!';
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
        this.errorMessage = 'Erreur lors de la création du devis vie';
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
  navigateToVieDevis() {
    this.router.navigate(['/acceuil-devis']);
  }
}