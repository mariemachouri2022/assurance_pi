import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisAuto } from '../../../models/devis.model';
import { DevisService } from '../../../Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-auto',
  templateUrl: './liste-devis-auto.component.html',
  styleUrls: ['./liste-devis-auto.component.css']
})
export class ListeDevisAutoComponent implements OnInit {
  devisList: DevisAuto[] = [];
  filteredDevisList: DevisAuto[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisAuto | null = null;

  searchKeyword: string = '';
  selectedType: string = '';
  contractTypes: string[] = ['tiers', 'intermediaire', 'tous_risques'];
  isSearching: boolean = false;


  currentLanguage = 'Français';

  sortDirection: 'asc' | 'desc' = 'asc';
  sortField: string = 'typeContrat'; // Default sort by typeContrats

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}
  changeLanguage(lang: string) {
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event('change'));
      this.currentLanguage = this.getLanguageName(lang);
    } else {
      console.error('Google Translate dropdown not found.');
    }
  }
  
  getLanguageName(code: string): string {
    const languages: {[key: string]: string} = {
      'fr': 'Français',
      'en': 'English',
      'ar': 'العربية'
    };
    return languages[code] || code;
  }
  
  sortDevis(field: string) {
    if (this.sortField === field) {
      // Reverse direction if clicking the same field
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New field, default to ascending
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredDevisList.sort((a, b) => {
      let valueA = a[field as keyof DevisAuto];
      let valueB = b[field as keyof DevisAuto];

      // Handle string comparison for typeContrat
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      // Handle number comparison for other fields
      else {
        return this.sortDirection === 'asc' 
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      }
    });
  }

  searchDevis() {
    if (!this.searchKeyword && !this.selectedType) {
      this.fetchDevisAuto();
      return;
    }

    this.isSearching = true;
    this.devisService.searchDevisAuto(this.searchKeyword, this.selectedType)
      .subscribe({
        next: (data: DevisAuto[]) => {
          this.filteredDevisList = data;
          this.sortDevis(this.sortField); // Apply sorting after search
          this.isSearching = false;
        },
        error: (error: any) => {
          console.error('Search error:', error);
          this.filteredDevisList = [];
          this.isSearching = false;
        }
      });
  }

  resetFilters() {
    this.searchKeyword = '';
    this.selectedType = '';
    this.fetchDevisAuto();
  }

  ngOnInit(): void {
    this.fetchDevisAuto();
    
  }

  fetchDevisAuto(): void {
  
  
    this.devisService.getAllDevisAuto().subscribe({
      next: (data: DevisAuto[]) => {
        this.devisList = data;
        this.filteredDevisList = [...data]; // Initialize the filtered list
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des devis auto:', error);
        this.errorMessage = 'Impossible de charger les devis auto.';
      }
    });
  }

  // Add this method to fix the first error
  goToAddDevisAuto() {
    this.router.navigate(['/addDevisAuto']);
  }

  updateDevisAuto(devis: DevisAuto): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      console.log('Attempting to update with:', this.selectedDevis);
      
      this.devisService.updateDevisAuto(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          console.log('Update successful');
          this.fetchDevisAuto();
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

  generatePDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
    const banner = new Image();
    banner.src = 'assets/Front/images/auto.jpg'; // Rename your uploaded banner as banner-sante.png
    
    const logo = new Image();
    logo.src = 'assets/Front/images/logo.png'; // Your logo

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Liste des Devis Auto', 105, 15, { align: 'center' });

    // Add date
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });

    // Table data
    const tableData = this.devisList.map(devis => [
      devis.immatriculation,
      devis.marque,
      devis.modele,
      devis.annee,
      devis.kilometrage,
      this.formatContratType(devis.typeContrat)
    ]);

    // Generate table
    autoTable(doc, {
      head: [['Immatriculation', 'Marque', 'Modèle', 'Année', 'Kilométrage', 'Type de Contrat']],
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
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 15 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 }
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
    doc.save(`Liste_Devis_Auto_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  public  formatContratType(type: string): string {
    const types: { [key: string]: string } = {
      'tiers': 'Tiers simple',
      'intermediaire': 'Tiers étendu',
      'tous_risques': 'Tous risques'
    };
    return types[type] || type;
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.selectedDevis = null;
  }

  deleteDevisAuto(id?: string | null): void {
    if (!id) {
      console.error("L'ID du devis est invalide !");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce devis ?")) {
      this.devisService.deleteDevisAuto(id).subscribe(() => {
        this.devisList = this.devisList.filter(devis => devis.id !== id);
        console.log('Devis auto supprimé avec succès');
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }

  

}
