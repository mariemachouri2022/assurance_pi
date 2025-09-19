import { Component } from '@angular/core';
import { Sinistre } from 'src/app/models/sinistre.model';
import { HttpClient } from '@angular/common/http';
import { SinistreService } from 'src/app/Services/SinistreService/sinistre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sinistre',
  templateUrl: './add-sinistre.component.html',
  styleUrls: ['./add-sinistre.component.css']
})
export class AddSinistreComponent {
  sinistre: Sinistre = {
    description: '',
    dateSinistre: new Date(),
    montantRembourssement: 0,
    status: 'En attente' // Valeur par défaut
  };

  constructor(private http: HttpClient, private sinistreService: SinistreService, public router: Router) {}

  onSubmit(): void {
    this.sinistreService.addsinistre(this.sinistre).subscribe({
      next: (response) => {
        console.log('Sinistre ajouté avec succès', response);
        this.router.navigate(['/sinistre']); // Redirection après ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du sinistre', error);
      }
    });
  }
}
