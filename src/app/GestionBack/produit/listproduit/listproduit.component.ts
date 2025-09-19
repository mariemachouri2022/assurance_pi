import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../Services/produitservice/produit.service';
import { Produit ,TypeProduit } from '../../../models/produit.model';
import {Router} from "@angular/router";


@Component({
  selector: 'app-liste-produit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListProduitComponent implements OnInit {
  produits: Produit[] = []; // Stocker la liste des produits
  errorMessage: string = '';
  typeOptions = Object.values(TypeProduit);
  searchResults: Produit[] = [];
  searchType: TypeProduit | null = null;
  constructor(private produitService: ProduitService, private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProduits();


  }

  fetchProduits(): void {
    this.produitService.getAllProduit().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
        this.errorMessage = 'Impossible de charger les produits.';
      }
    });
  }
  deleteProduit(id?: string): void {
    if (!id) {
      console.error("L'ID du contrat est invalide !");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.produitService.deleteProduit(id).subscribe(() => {
        this.produits = this.produits.filter(produit => produit.id !== id);
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }
  goToAddProduit() {
    this.router.navigate(['/AddProduit']);
  }
  goToUpdateProduit(id: string | undefined  ) {
    this.router.navigate(['/UpdateProduit',id]);
  }
  searchByType(): void {
    if (!this.searchType) {
      this.searchResults = [...this.produits];
      return;
    }

    this.produitService.searchByType(this.searchType).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Search error:', err);
        this.errorMessage = 'Error during search';
        this.searchResults = [];
      }
    });
  }

  // Reset method
  resetSearch(): void {
    this.searchType = null;
    this.searchResults = [...this.produits];
  }


}
