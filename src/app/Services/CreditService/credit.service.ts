import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Credit} from "../../models/credit.model";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  private apiUrl = 'http://localhost:8028/credits';
  // URL de ton backend Spring Boot

  constructor(private http: HttpClient) { }

  // ✅ Récupérer la liste des crédits
  getAllCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/all`);
  }

  addCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(`${this.apiUrl}/add`, credit);
  }
  // ✅ Mettre à jour un crédit existant
  updateCredit(id: string, updatedCredit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/${id}`, updatedCredit);
  }

  deleteCredit(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
