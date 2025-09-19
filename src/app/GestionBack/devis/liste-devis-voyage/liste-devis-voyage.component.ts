import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DevisVoyage, EtatDevis } from 'src/app/models/devis.model';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';

@Component({
  selector: 'app-liste-devis-voyage',
  templateUrl: './liste-devis-voyage.component.html',
  styleUrls: ['./liste-devis-voyage.component.css']
})
export class ListeDevisVoyageComponent implements OnInit {
  devisList: DevisVoyage[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  filteredDevisList: DevisVoyage[] = [];
  searchParams = {
    keyword: '',
    destination: '',
    zoneGeographique: '',
    trancheAge: '',
    dureeContrat: null as number | null
  };
  sortField = 'dureeContrat';
  sortDirection = 'asc';

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDevisVoyage();
  }

// Update loadDevisVoyage method:
loadDevisVoyage(): void {
  this.isLoading = true;
  this.devisService.getAllDevisVoyage().subscribe({
    next: (data) => {
      this.devisList = data;
      this.filteredDevisList = [...data]; // Initialize filtered list
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'Failed to load quotes';
      this.isLoading = false;
    }
  });
}

  goToAddDevisVoyage(): void {
    this.router.navigate(['/voyage-form']);
  }

  editDevis(id: string | null): void {
    if (id) {
      this.router.navigate(['/edit-devis-voyage', id]);
    }
  }

  deleteDevis(id: string | null): void {
    if (id && confirm('Are you sure you want to delete this quote?')) {
      this.devisService.deleteDevisVoyage(id).subscribe({
        next: () => {
          this.devisList = this.devisList.filter(d => d.id !== id);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete the quote';
        }
      });
    }
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('fr-FR');
  }

  getEtatBadgeClass(etat: EtatDevis): string {
    switch (etat) {
      case EtatDevis.VALIDE: return 'badge-success';
      case EtatDevis.EN_ATTENTE: return 'badge-warning';
      default: return 'badge-danger';
    }
  }

  generatePDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
    const banner = new Image();
    banner.src = 'assets/Front/images/voyage.jpg'; // Rename your uploaded banner as banner-sante.png
    
    const logo = new Image();
    logo.src = 'assets/Front/images/logo.png'; // Your logo
  
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('Liste des Devis Voyage', 105, 15, { align: 'center' });
  
    // Add date
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 200, 10, { align: 'right' });
  
    // Table data
    const tableData = this.devisList.map(devis => [
      devis.destination,
      devis.zoneGeographique,
      this.formatDate(devis.dateDepart),
      this.formatDate(devis.dateRetour),
      devis.trancheAge,
      `${devis.dureeContrat} jours`,
      `${devis.montantEstime} TND`,
      devis.etatDevis
    ]);
  
    // Generate table
    autoTable(doc, {
      head: [['Destination', 'Zone', 'Départ', 'Retour', 'Tranche d\'âge', 'Durée', 'Montant', 'État']],
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
        4: { cellWidth: 20 },
        5: { cellWidth: 15 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 }
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
    doc.save(`Liste_Devis_Voyage_${new Date().toISOString().slice(0, 10)}.pdf`);
  }



  searchDevis(): void {
    const params: any = {};
  Object.keys(this.searchParams).forEach(key => {
    const value = this.searchParams[key as keyof typeof this.searchParams];
    if (value !== '' && value !== null && value !== undefined) {
      params[key] = value;
    }
  });

  this.devisService.searchDevisVoyage(params).subscribe({
    next: (data) => {
      this.filteredDevisList = data;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Search error:', err);
      this.isLoading = false;
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

    this.devisService.sortDevisVoyage(this.sortField, this.sortDirection)
      .subscribe({
        next: (data) => this.filteredDevisList = data,
        error: (err) => console.error('Sort error:', err)
      });
  }

  resetFilters(): void {
    this.searchParams = {
      keyword: '',
      destination: '',
      zoneGeographique: '',
      trancheAge: '',
      dureeContrat: null,
      
    };
    this.loadDevisVoyage();
  }

  // Add this helper method
  hasActiveFilters(): boolean {
    return Object.values(this.searchParams).some(
      val => val !== '' && val !== null && val !== undefined
    );
  }
  
}