import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../Services/produitservice/produit.service';
import { Produit, TypeProduit } from '../../../models/produit.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajoutproduit',
  templateUrl: './ajoutproduit.component.html',
  styleUrls: ['./ajoutproduit.component.css']
})
export class AjoutproduitComponent implements OnInit {

  produit: Produit = {
    Tarifs: 0,
    Description: '',
    type: TypeProduit.VIE, // Valeur par défaut
    Image: ''
  };

  typeproduitoptions = Object.values(TypeProduit);
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private produitService: ProduitService,private router: Router) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  // Gérer la sélection de fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Prévisualiser l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      console.log('Selected File:', file);
    }
  }

  // Soumettre le formulaire
  onSubmit(): void {
    const formData = new FormData();
    formData.append('Type', this.produit.type);
    formData.append('Description', this.produit.Description);
    formData.append('Tarifs', this.produit.Tarifs.toString());

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.produitService.addProduit(formData).subscribe({
      next: (response) => {
        console.log('Produit ajouté avec succès', response);
        this.resetForm();
        this.router.navigate(['/ListeProduit']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
      }
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.produit = {
      type: TypeProduit.VIE,
      Description: '',
      Tarifs: 0,
      Image: ''
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }

}
