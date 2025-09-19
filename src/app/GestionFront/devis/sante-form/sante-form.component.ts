import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';
import { DevisSante, TypeAssurance, EtatDevis, Offre } from 'src/app/models/devis.model';
import { ToastService } from 'angular-toastify';
import { OffreService } from 'src/app/Services/DevisService/offre.service';

@Component({
  selector: 'app-sante-form',
  templateUrl: './sante-form.component.html',
  styleUrls: ['./sante-form.component.css']
})
export class SanteFormComponent implements OnInit {
  typeAssuranceOptions = Object.values(TypeAssurance);
  etatDevisOptions = Object.values(EtatDevis);
  santeForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  showSuccess = false;
  showOffres = false;
  offres: Offre[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private devisService: DevisService , private _toastService: ToastService , private offreService: OffreService
  ) {
    this.santeForm = this.formBuilder.group({}); // Initialize empty form
  }

  ngOnInit(): void {
    this.initSanteForm();
  }

  initSanteForm(): void {
    this.santeForm = this.formBuilder.group({
      contactNom: ['', Validators.required],
      contactPrenom: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactSociete: [''],
      contactFonction: [''],
      contactTelephone: ['', [Validators.pattern('^[0-9]{8}$')]],
      contactDateNaissance: ['', Validators.required],
      typeAssurance: [TypeAssurance.SANTE, Validators.required],
      etatDevis: [EtatDevis.EN_ATTENTE, Validators.required],
      montantEstime: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.santeForm.invalid) {
      this.markFormGroupTouched(this.santeForm);
      return;
    }

    this.isSubmitting = true;
    const devisSante: DevisSante = this.santeForm.value;

    this.devisService.addDevisSante(devisSante).subscribe({
      next: (response) => {
        this.devisService.sendmail('yossra.tlili@esprit.tn','Enregistrement de votre devis','Bonjour chers clients, Votre demande de devis Santé a bien été enregistrée. Un conseiller vous contactera sous 48h pour finaliser votre contrat. Cordialement,Léquipe Assurance va vous aider!').subscribe();
        this._toastService.success('Devis Santé ajouté avec succès et email envoyé!');
        this.successMessage = 'Devis santé créé avec succès!';
        this.showSuccess = true; 
        setTimeout(() => this.showSuccess = false, 3000);
        this.generateOffres(response.id!);
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création du devis. Veuillez réessayer.';
        console.error('Error:', error);
      }
    }).add(() => {
      this.isSubmitting = false;
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
    this.santeForm.reset({
      typeAssurance: TypeAssurance.SANTE,
      etatDevis: EtatDevis.EN_ATTENTE,
      montantEstime: 0
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}