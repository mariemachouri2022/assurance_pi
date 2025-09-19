import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisSante, EtatDevis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-sante',
  templateUrl: './liste-devis-sante.component.html',
  styleUrls: ['./liste-devis-sante.component.css']
})
export class ListeDevisSanteComponent implements OnInit {
  devisList: DevisSante[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisSante | null = null;
  etatDevisOptions = Object.values(EtatDevis);
  filteredDevisList: DevisSante[] = [];
  searchKeyword: string = '';
  selectedSociete: string = '';
  sortField: string = 'contactNom';
  sortDirection: string = 'asc';
  isSearching: boolean = false;

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDevisSante();
  }
  

  fetchDevisSante(): void {
    this.devisService.getAllDevisSante().subscribe({
      next: (data: DevisSante[]) => {
        this.devisList = data;
        this.filteredDevisList = [...data]; // Initialize filtered list
      this.sortDevis(this.sortField); // Apply default sort
      },
      error: (error) => {
        console.error('Error fetching health insurance quotes:', error);
        this.errorMessage = 'Failed to load health insurance quotes.';
      }
    });
  }

  goToAddDevisSante() {
    this.router.navigate(['/addDevisSante']);
  }

  updateDevisSante(devis: DevisSante): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      this.devisService.updateDevisSante(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          this.fetchDevisSante();
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

  deleteDevisSante(id?: string | null): void {
    if (id && confirm("Delete this health insurance quote?")) {
      this.devisService.deleteDevisSante(id).subscribe({
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
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    const banner = new Image();
  banner.src = 'assets/Front/images/sante.jpg'; // Rename your uploaded banner as banner-sante.png
  
  const logo = new Image();
  logo.src = 'assets/Front/images/logo.png'; // Your logo
  
    banner.onload = () => {
      // Add banner image at the top
      doc.addImage(banner, 'PNG', 10, 10, 190, 35); // Adjusted for A4 width
  
      // Title below banner
      doc.setFontSize(16);
      doc.setTextColor(33, 33, 33);
      doc.text('Assurance Santé – Informations et Devis', 105, 50, { align: 'center' });
  
      // Definition block
      doc.setFontSize(11);
      doc.setTextColor(66, 66, 66);
      const definition = `L'assurance santé est un contrat qui permet de couvrir les frais médicaux et chirurgicaux en cas de maladie, hospitalisation ou accident. Elle offre une protection financière face aux dépenses de santé, en complément ou en supplément des régimes publics.`;
      doc.text(doc.splitTextToSize(definition, 180), 15, 60);
  
      // Date on the top-right
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
      // Table data
      const tableData = this.devisList.map(devis => [
        devis.contactNom,
        devis.contactPrenom,
        devis.contactEmail,
        devis.contactTelephone,
        devis.contactSociete || 'N/A',
        `${devis.montantEstime ?? 'Non défini'} TND`,
        devis.etatDevis || 'Non précisé'
      ]);
  
      // Table start position adjusted for portrait
      autoTable(doc, {
        head: [['Nom', 'Prénom', 'Email', 'Téléphone', 'Société', 'Montant', 'État']],
        body: tableData,
        startY: 80,
        theme: 'grid',
        headStyles: {
          fillColor: [255, 87, 34], // Orange
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 11
        },
        alternateRowStyles: {
          fillColor: [255, 248, 239]
        },
        styles: {
          fontSize: 9,
          font: 'helvetica',
          cellPadding: 3,
          valign: 'middle',
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 25 },
          2: { cellWidth: 40 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 }
        },
        margin: { left: 10, right: 10 }
      });
  
      // Footer with logo and contact
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.addImage(logo, 'PNG', 10, 285, 20, 12);
  
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('www.monassurance.tn | contact@monassurance.tn', 105, 292, { align: 'center' });
        doc.text(`Page ${i} sur ${pageCount}`, 200, 292, { align: 'right' });
      }
  
      doc.save(`Devis_Sante_${new Date().toISOString().slice(0, 10)}.pdf`);
    };
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
      let valueA = a[field as keyof DevisSante]; // Changed to DevisSante
      let valueB = b[field as keyof DevisSante]; // Changed to DevisSante
  
      // Handle string comparison (for Nom, Prénom, Société)
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      // Handle number comparison (for Montant)
      else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
      return 0;
    });
  }

  searchDevis() {
    if (!this.searchKeyword && !this.selectedSociete) {
      this.fetchDevisSante(); // Changed to fetchDevisSante
      return;
    }
  
    this.isSearching = true;
    this.devisService.searchDevisSante(this.searchKeyword, this.selectedSociete) // Changed service method
      .subscribe({
        next: (data: DevisSante[]) => { // Changed to DevisSante[]
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
    this.selectedSociete = '';
    this.fetchDevisSante();
  }

  // In your component class
getUniqueSocietes(): string[] {
  return [...new Set(this.devisList.map(item => item.contactSociete))].filter(s => s);
}
 
}