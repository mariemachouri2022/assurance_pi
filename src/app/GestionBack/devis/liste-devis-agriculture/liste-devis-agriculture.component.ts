import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisAgriculture, EtatDevis, TypeCulture } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-agriculture',
  templateUrl: './liste-devis-agriculture.component.html',
  styleUrls: ['./liste-devis-agriculture.component.css']
})
export class ListeDevisAgricultureComponent implements OnInit {
  devisList: DevisAgriculture[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisAgriculture | null = null;
  typeCultureOptions = Object.values(TypeCulture);
  etatDevisOptions = Object.values(EtatDevis);
  filteredDevisList: DevisAgriculture[] = [];


  currentLanguage = 'Français';
   // Search and Sort variables
   searchKeyword: string = '';
   isSearching: boolean = false;
   sortField: string = 'typeCulture';
   sortDirection: string = 'asc';

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

  ngOnInit(): void {
    this.fetchDevisAgriculture();
  }

  fetchDevisAgriculture(): void {
    this.devisService.getAllDevisAgriculture().subscribe({
      next: (data: DevisAgriculture[]) => {
        this.devisList = data;
        this.filteredDevisList = [...data];
      },
      error: (error) => {
        console.error('Error fetching agriculture insurance quotes:', error);
        this.errorMessage = 'Failed to load agriculture insurance quotes.';
      }
    });
  }

  searchDevis(): void {
    this.isSearching = true;
    this.devisService.searchDevisAgriculture(this.searchKeyword)
      .subscribe({
        next: (data) => {
          this.filteredDevisList = data;
          this.isSearching = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.errorMessage = 'Error during search';
          this.isSearching = false;
        }
      });
  }
  
  sortDevis(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    this.devisService.sortDevisAgriculture(field, this.sortDirection)
      .subscribe({
        next: (data) => {
          this.filteredDevisList = data;
        },
        error: (error) => {
          console.error('Sort error:', error);
          this.errorMessage = 'Error during sorting';
        }
      });
  }

  resetFilters(): void {
    this.searchKeyword = '';
    this.filteredDevisList = [...this.devisList];
  }

  goToAddDevisAgriculture() {
    this.router.navigate(['/addDevisAgriculture']);
  }

  updateDevisAgriculture(devis: DevisAgriculture): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      this.devisService.updateDevisAgriculture(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          this.fetchDevisAgriculture();
          this.cancelUpdate();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Update error:', error);
        }
      });
    }
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.selectedDevis = null;
  }

  deleteDevisAgriculture(id?: string | null): void {
    if (id && confirm("Delete this agriculture insurance quote?")) {
      this.devisService.deleteDevisAgriculture(id).subscribe({
        next: () => {
          this.devisList = this.devisList.filter(d => d.id !== id);
        },
        error: (error) => {
          console.error('Delete error:', error);
        }
      });
    }
  }
  generatePDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
  
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Liste des Devis Agricoles', 105, 15, { align: 'center' });
  
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
    const tableData = this.devisList.map(devis => [
      devis.typeCulture,
      `${devis.surfaceExploitation} ha`,
      devis.nombreAnimaux,
      `${devis.valeurMateriel} €`,
      devis.risquesCouverts
    ]);
  
    autoTable(doc, {
      head: [['Type Culture', 'Surface', 'Animaux', 'Valeur Matériel', 'Risques']],
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
  
    doc.save(`Liste_Devis_Agriculture_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}