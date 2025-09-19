import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Added Validators import
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Offre, TypeCulture } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';
import { OffreService } from 'src/app/Services/DevisService/offre.service';

@Component({
  selector: 'app-agriculture-form',
  templateUrl: './agriculture-form.component.html',
  styleUrls: ['./agriculture-form.component.css']
})
export class AgricultureFormComponent {
  devisForm: FormGroup;
  typeCultureOptions = Object.values(TypeCulture);
  isLoading = false;
  errorMessage = '';
  isSubmitting = false;
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];

  constructor(
    private fb: FormBuilder,
    private devisService: DevisService,
    private router: Router , private _toastService: ToastService ,
    private offreService: OffreService
  ) {
    this.devisForm = this.fb.group({
      montantEstime: ['', [Validators.required, Validators.min(0)]],
      surfaceExploitation: ['', [Validators.required, Validators.min(0)]],
      typeCulture: ['', Validators.required],
      nombreAnimaux: ['', [Validators.required, Validators.min(0)]],
      valeurMateriel: ['', [Validators.required, Validators.min(0)]],
      risquesCouverts: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.devisForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = {
      ...this.devisForm.value,
      typeAssurance: 'AGRICULTURE',
      etatDevis: 'EN_ATTENTE',
      dateDemande: new Date()
    };

    this.devisService.addDevisAgriculture(formData).subscribe({
      next: (response: any) => { // Added type annotation
        this.isLoading = false;
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis Agriculture a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Agriculture ajouté avec succès et email envoyé!');
        this.router.navigate(['/devis/success'], { state: { devisId: response.id } });
        this.showSuccess = true; 
        setTimeout(() => this.showSuccess = false, 3000);
        this.generateOffres(response.id!);
      },
      error: (err: any) => { // Added type annotation
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création du devis. Veuillez réessayer.';
        console.error('Error creating devis:', err);
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

  navigateToAgricultureForm(): void {
    this.router.navigate(['/AgricultureForm']);
  } 

}
