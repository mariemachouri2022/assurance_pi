import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisHabitation, EtatDevis, TypeLogement, TypeAssurance } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-habitation',
  templateUrl: './liste-devis-habitation.component.html',
  styleUrls: ['./liste-devis-habitation.component.css']
})
export class ListeDevisHabitationComponent implements OnInit {
  devisList: DevisHabitation[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisHabitation | null = null;
  typeLogementOptions = Object.values(TypeLogement);
  etatDevisOptions = Object.values(EtatDevis);


  searchKeyword: string = '';
  sortField: string = '';
  sortDirection: string = 'asc';
  isSearching: boolean = false;

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDevisHabitation();
  }
  searchDevis(): void {
    this.isSearching = true;
    this.devisService.searchDevis(this.searchKeyword).subscribe(
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

  sortDevis(attribute: string): void {
    if (this.sortField === attribute) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = attribute;
      this.sortDirection = 'asc';
    }

    this.devisService.sortDevis(this.sortField, this.sortDirection).subscribe(
      (data) => {
        this.devisList = data;
      },
      (error) => {
        console.error('Sort error:', error);
      }
    );
  }

  resetFilters(): void {
    this.searchKeyword = '';
    this.devisList = [];
    // Add reset logic for sort too if you want
    this.sortField = '';
    this.sortDirection = 'asc';
  }

  
  
  fetchDevisHabitation(): void {
    this.devisService.getAllDevisHabitation().subscribe({
      next: (data: DevisHabitation[]) => {
        this.devisList = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des devis Habitation:', error);
        this.errorMessage = 'Impossible de charger les devis Habitation.';
      }
    });
  }
  

  goToAddDevisHabitation() {
    this.router.navigate(['/addDevisHabitation']);
  }

  updateDevisHabitation(devis: DevisHabitation): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      console.log('Attempting to update with:', this.selectedDevis);
      
      this.devisService.updateDevisHabitation(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          console.log('Update successful');
          this.fetchDevisHabitation();
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

  deleteDevisHabitation(id?: string | null): void {
    if (!id) {
      console.error("L'ID du devis est invalide !");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce devis ?")) {
      this.devisService.deleteDevisHabitation(id).subscribe(() => {
        this.devisList = this.devisList.filter(devis => devis.id !== id);
        console.log('Devis Habitation supprimé avec succès');
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
    banner.src = 'assets/Front/images/habitation.jpg'; // Rename your uploaded banner as banner-sante.png
    
    const logo = new Image();
    logo.src = 'assets/Front/images/logo.png'; // Your logo
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Liste des Devis Habitation', 105, 15, { align: 'center' });
  
    // Add date
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
    // Table data
    const tableData = this.devisList.map(devis => [
      devis.typeLogement,
      `${devis.surface} m²`,
      `${devis.valeurBien} TND`,
      devis.niveauRisque,
      devis.alarmeSecurite ? 'Oui' : 'Non',
      `${devis.montantEstime} TND`,
      devis.etatDevis
    ]);
  
    // Generate table
    autoTable(doc, {
      head: [['Type', 'Surface', 'Valeur', 'Risque', 'Alarme', 'Montant', 'État']],
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
      },
      margin: { top: 30 },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 15 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 }
      }
    });
  
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        200,
        200,
        { align: 'right' }
      );
    }
  
    // Save the PDF
    doc.save(`Liste_Devis_Habitation_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  
}