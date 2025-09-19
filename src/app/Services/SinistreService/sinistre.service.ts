import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Sinistre} from "../../models/sinistre.model";

@Injectable({
  providedIn: 'root'
})
export class SinistreService {
  private apiUrl = 'http://localhost:8025/sinistre';
  // URL de ton backend Spring Boot

  constructor(private http: HttpClient) { }

  // ✅ Récupérer la liste des crédits
  getAllSinistre(): Observable<Sinistre[]> {
    return this.http.get<Sinistre[]>(`${this.apiUrl}/all`);
  }

  addsinistre(sinistre: Sinistre): Observable<Sinistre> {
    return this.http.post<Sinistre>(`${this.apiUrl}/add`, sinistre);
  }
  // ✅ Mettre à jour un crédit existant
  updatesinistre(id: string, updateSinistre: Sinistre): Observable<Sinistre> {
    return this.http.put<Sinistre>(`${this.apiUrl}/${id}`, updateSinistre);
  }

  deleteSinistre(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
