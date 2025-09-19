import { Component, OnInit } from '@angular/core';
import { Sinistre } from 'src/app/models/sinistre.model';
import { SinistreService } from 'src/app/Services/SinistreService/sinistre.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-sinistre',
  templateUrl: './update-sinistre.component.html',
  styleUrls: ['./update-sinistre.component.css']
})
export class UpdateSinistreComponent implements OnInit {
  sinistre: Sinistre = {
    description: '',
    dateSinistre: new Date(),
    montantRembourssement: 0,
    status: 'En attente'
  };

  constructor(
    private sinistreService: SinistreService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sinistreService.getAllSinistre().subscribe((sinistres) => {
        const foundSinistre = sinistres.find((s) => s.id === id);
        if (foundSinistre) {
          this.sinistre = foundSinistre;
        }
      });
    }
  }

  onUpdate(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sinistreService.updatesinistre(id, this.sinistre).subscribe(
        (response) => {
          console.log('Sinistre mis à jour avec succès !', response);
          this.router.navigate(['/sinistre']); // Redirection après mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du sinistre', error);
        }
      );
    }
  }
}
