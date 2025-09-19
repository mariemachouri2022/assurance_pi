import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit , TypeProduit} from "../../models/produit.model";


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8026/produits';  // URL de ton backend Spring Boot

  constructor(private http: HttpClient) { }

  // ✅ Récupérer la liste des crédits
  getAllProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }
  addProduit(produit: any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/addProduit`, produit);
  }
  updateProduit(id: string, produit: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produit);
  }
  deleteProduit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchByType(type: TypeProduit): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/recherche?type=${type}`);
  }

  
}
