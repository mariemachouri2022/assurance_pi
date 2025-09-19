import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8080/api/chat'; // Adjust if needed

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const systemPrompt = "Répondez uniquement aux questions liées à l'assurance (auto, habitation, santé, vie, prévoyance, voyage, etc.). Si la question sort du domaine, redirigez poliment l'utilisateur.";
    const payload = {
      message: `${systemPrompt}\nUtilisateur: ${message}`
    };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
