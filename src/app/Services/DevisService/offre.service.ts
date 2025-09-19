import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from '../../../app/models/devis.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:8027/api/offres';

  constructor(private http: HttpClient) {}

  getByDevisId(devisId: string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/devis/${devisId}`);
  }

  // createOffre(offre: Offre): Observable<Offre> {
  //   return this.http.post<Offre>(`${this.apiUrl}/createOffre`, offre);
  // }
  saveSelectedOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}`, offre);
  }

  generateOffres(devisId: string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/generate/${devisId}`);
  }
}