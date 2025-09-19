import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisEcolia, EtatDevis, TypeIdentite, TypeAssurance } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-ecolia',
  templateUrl: './liste-devis-ecolia.component.html',
  styleUrls: ['./liste-devis-ecolia.component.css']
})
export class ListeDevisEcoliaComponent implements OnInit {
  devisList: DevisEcolia[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisEcolia | null = null;
  typeIdentiteOptions = Object.values(TypeIdentite);
  etatDevisOptions = Object.values(EtatDevis);

  searchKeyword: string = '';
  isSearching: boolean = false;
  sortField: string = '';
sortDirection: string = 'asc';

selectedType: string = '';  // or initialize it with any default value or type

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDevisEcolia();
  }
  // Search method
  searchDevis() {
    this.isSearching = true;
    this.devisService.searchDevisEcolia(this.searchKeyword).subscribe(
      (data) => {
        this.devisList = data;
        this.isSearching = false;
      },
      (error) => {
        console.error('Search error:', error);
        this.isSearching = false;
      }
    );
  }

  // Sort method
  sortDevisEcolia(attribute: string): void {
    if (this.sortField === attribute) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        this.sortField = attribute;
        this.sortDirection = 'asc';
    }
    
    this.devisService.sortDevisEcolia(this.sortField, this.sortDirection).subscribe(
        (data) => {
            this.devisList = data;  // Assuming you store the sorted data in this list
        },
        (error) => {
            console.error('Sort error:', error);
        }
    );
}
  resetFilters() {
    this.searchKeyword = ''; // Clear the search keyword
    this.devisList = []; // Optionally, clear the list as well
    // You can reset any other filters you might have here
  }

  fetchDevisEcolia(): void {
    this.devisService.getAllDevisEcolia().subscribe({
      next: (data: DevisEcolia[]) => {
        this.devisList = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des devis Ecolia:', error);
        this.errorMessage = 'Impossible de charger les devis Ecolia.';
      }
    });
  }

  goToAddDevisEcolia() {
    this.router.navigate(['/addDevisEcolia']);
  }

  updateDevisEcolia(devis: DevisEcolia): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      console.log('Attempting to update with:', this.selectedDevis);
      
      this.devisService.updateDevisEcolia(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          console.log('Update successful');
          this.fetchDevisEcolia();
          this.cancelUpdate();
        },
        error: (error) => {
          console.error('Full error details:', error);
          if (error instanceof HttpErrorResponse) {
            console.log('Status:', error.status);
            console.log('Error message:', error.message);
            console.log('Response body:', error.error);
          }
        }
      });
    }
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.selectedDevis = null;
  }

  deleteDevisEcolia(id?: string | null): void {
    if (!id) {
      console.error("L'ID du devis est invalide !");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce devis ?")) {
      this.devisService.deleteDevisEcolia(id).subscribe(() => {
        this.devisList = this.devisList.filter(devis => devis.id !== id);
        console.log('Devis Ecolia supprimé avec succès');
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }
  generatePDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
    const banner = new Image();
    banner.src = 'assets/Front/images/ecolia.jpg'; // Rename your uploaded banner as banner-sante.png
    
    const logo = new Image();
    logo.src = 'assets/Front/images/logo.png'; // Your logo
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Liste des Devis Ecolia', 105, 15, { align: 'center' });
  
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
    const tableData = this.devisList.map(devis => [
      devis.parentTuteurNom,
      devis.parentTuteurPieceIdentite,
      devis.parentTuteurNumPieceIdentite,
      devis.nombreEnfants,
      devis.dateEffet.toLocaleDateString()
    ]);
  
    autoTable(doc, {
      head: [['Tuteur', 'Type PI', 'Num PI', 'Enfants', 'Date Effet']],
      body: tableData,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
    const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} sur ${pageCount}`, 200, 200, { align: 'right' });
  }
  
    doc.save('devis-ecolia.pdf');
  }
  
}