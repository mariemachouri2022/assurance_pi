import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assurance-form',
  templateUrl: './assurance-form.component.html',
  styleUrls: ['./assurance-form.component.css']
})
export class AssuranceFormComponent {
  formData = {
    Age: null,
    Sexe: '',
    Prime_Annuelle: null,
    Nombre_Sinistres: null,
    Montant_Rembo: null,
    Fidelite: null
  };

  result: any = null;
  probabilities: any = null;
  showModal: boolean = false; // Corrected here

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://127.0.0.1:5000/predict', this.formData)
      .subscribe({
        next: (res) => {
          this.result = res.prediction;
          this.probabilities = res.probabilites;
          this.showModal = true; // show modal when prediction is ready
        },
        error: (err) => console.error('Erreur:', err)
      });
  }

  closeModal() {
    this.showModal = false;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
