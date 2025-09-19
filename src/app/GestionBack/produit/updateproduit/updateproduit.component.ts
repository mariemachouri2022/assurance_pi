import { Component, Type } from '@angular/core';
import { ProduitService } from '../../../Services/produitservice/produit.service';
import { Produit, TypeProduit } from '../../../models/produit.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-updateproduit',
  templateUrl: './updateproduit.component.html',
  styleUrls: ['./updateproduit.component.css']
})
export class UpdateproduitComponent {
  produit: Produit = {
    Tarifs: 0,
       Description: "aaaa",
  type:TypeProduit.VIE,
       Image:""
  };

  typeproduitoptions = Object.values(TypeProduit);
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      console.log('Selected File:', file);
    }
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produitService.getAllProduit().subscribe((produits) => {
        const foundproduit = produits.find((c) => c.id === id);
        if (foundproduit) {
          this.produit = foundproduit;
        }
      });
    }
  }

updateProduit(): void {
  const formData = new FormData();
  formData.append('type', this.produit.type);
  formData.append('Description', this.produit.Description);
  formData.append('Tarifs', this.produit.Tarifs.toString());

  if (this.selectedFile) {
    formData.append('Image', this.selectedFile, this.selectedFile.name);
  }

  if (this.produit.id) {
    this.produitService.updateProduit(this.produit.id, formData).subscribe(
      () => {
        alert('Produit mis à jour avec succès !');
        this.router.navigate(['/ListeProduit']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit :', error);
      }
    );
  }
}


}
