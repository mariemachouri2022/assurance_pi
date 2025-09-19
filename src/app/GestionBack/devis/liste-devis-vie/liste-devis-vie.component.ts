import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisVie, EtatDevis, TypeContrat } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-vie',
  templateUrl: './liste-devis-vie.component.html',
  styleUrls: ['./liste-devis-vie.component.css']
})
export class ListeDevisVieComponent implements OnInit {
  devisList: DevisVie[] = [];
  filteredDevisList: DevisVie[] = [];
  errorMessage: string = '';
  showUpdateForm = false;
  selectedDevis: DevisVie | null = null;
  typeContratOptions = Object.values(TypeContrat);
  etatDevisOptions = Object.values(EtatDevis);
  searchKeyword = '';
  selectedTypeContrat = '';
  sortField = 'beneficiaire';
  sortDirection = 'asc';
  isSearching = false;
  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDevisVie();
  }

  sortDevis(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredDevisList.sort((a, b) => {
      const valueA = a[field as keyof DevisVie];
      const valueB = b[field as keyof DevisVie];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
      return 0;
    });
  }

  searchDevis() {
    if (!this.searchKeyword && !this.selectedTypeContrat) {
      this.fetchDevisVie();
      return;
    }

    this.isSearching = true;
    this.devisService.searchDevisVie(this.searchKeyword, this.selectedTypeContrat)
      .subscribe({
        next: (data: DevisVie[]) => {
          this.filteredDevisList = data;
          this.sortDevis(this.sortField);
          this.isSearching = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isSearching = false;
        }
      });
  }
  getUniqueTypeContrats(): string[] {
    return [...new Set(this.devisList.map(item => item.typeContrat.toString()))].filter(t => t);
  }

 

  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedTypeContrat = '';  // Correct
    this.fetchDevisVie();
  }
  fetchDevisVie(): void {
    this.devisService.getAllDevisVie().subscribe({
      next: (data: DevisVie[]) => {
        this.devisList = data;
        this.filteredDevisList = [...data];
      this.sortDevis(this.sortField);
      },
      error: (error) => {
        console.error('Error fetching life insurance quotes:', error);
        this.errorMessage = 'Failed to load life insurance quotes.';
      }
    });
  }

  goToAddDevisVie() {
    this.router.navigate(['/addDevisVie']);
  }

  updateDevisVie(devis: DevisVie): void {
    this.selectedDevis = { ...devis };
    this.showUpdateForm = true;
  }

  onUpdateSubmit(): void {
    if (this.selectedDevis && this.selectedDevis.id) {
      this.devisService.updateDevisVie(this.selectedDevis.id, this.selectedDevis).subscribe({
        next: () => {
          this.fetchDevisVie();
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

  deleteDevisVie(id?: string | null): void {
    if (id && confirm("Delete this life insurance quote?")) {
      this.devisService.deleteDevisVie(id).subscribe({
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
    banner.src = 'assets/Front/images/vie.jpg'; // Rename your uploaded banner as banner-sante.png
    
    const logo = new Image();
    logo.src = 'assets/Front/images/logo.png'; // Your logo
  
    banner.onload = () => {
      // 📸 Banner image at the top
      doc.addImage(banner, 'PNG', 10, 10, 190, 35); // Full width on A4
  
      // 📘 Title below banner
      doc.setFontSize(16);
      doc.setTextColor(33, 33, 33);
      doc.text('Assurance Vie – Liste des Devis', 105, 50, { align: 'center' });
  
      // 📄 Definition of Assurance Vie
      doc.setFontSize(11);
      doc.setTextColor(66, 66, 66);
      const definition = `L'assurance vie est un contrat permettant de constituer une épargne sur le long terme tout en assurant une protection financière à un ou plusieurs bénéficiaires en cas de décès ou à l'échéance du contrat. Elle combine sécurité, transmission de patrimoine et rentabilité.`;
      doc.text(doc.splitTextToSize(definition, 180), 15, 60);
  
      // 🕒 Date
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
      // 📊 Table data
      const tableData = this.devisList.map(devis => [
        devis.typeContrat,
        `${devis.primeMensuelle} TND`,
        devis.beneficiaire,
        `${devis.rendementEspere}%`,
        `${devis.dureeMinimale} ans`,
        `${devis.montantEstime ?? 'Non défini'} TND`,
        devis.etatDevis ?? 'Non précisé'
      ]);
  
      // 📋 Table
      autoTable(doc, {
        head: [['Type', 'Prime', 'Bénéficiaire', 'Rendement', 'Durée', 'Montant', 'État']],
        body: tableData,
        startY: 85,
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
          0: { cellWidth: 28 },
          1: { cellWidth: 20 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
          4: { cellWidth: 18 },
          5: { cellWidth: 28 },
          6: { cellWidth: 25 }
        },
        margin: { left: 10, right: 10 }
      });
  
      // 🖋️ Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.addImage(logo, 'PNG', 10, 285, 20, 12); // Logo in footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('www.monassurance.tn | contact@monassurance.tn', 105, 292, { align: 'center' });
        doc.text(`Page ${i} sur ${pageCount}`, 200, 292, { align: 'right' });
      }
  
      doc.save(`Liste_Devis_Vie_${new Date().toISOString().slice(0, 10)}.pdf`);
    };
  }



  
  
}