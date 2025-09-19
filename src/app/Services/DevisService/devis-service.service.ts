import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { 
  DevisBase,
  DevisAuto,
  DevisEcolia,
  DevisHabitation,
  DevisSante,
  DevisAgriculture,
  DevisVie,
  DevisVoyage,
  Destination,
  TrancheAge,
  ZoneGeographique,
  TypeAssurance,
  EtatDevis
} from '../../models/devis.model';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = 'http://localhost:8027/api/devis';

  constructor(private http: HttpClient) { }
  //SEARCH DEVIS AUTO
  searchDevisAuto(keyword: string, type: string): Observable<DevisAuto[]> {
    let params = new HttpParams();
    if (keyword) params = params.append('keyword', keyword);
    if (type) params = params.append('type', type);
    
    return this.http.get<DevisAuto[]>(`${this.apiUrl}/auto/search`, { params });
  }

   // Sort method
   sortDevisAuto(sortBy: string, direction: string): Observable<DevisAuto[]> {
    let params = new HttpParams()
      .append('sortBy', sortBy)
      .append('direction', direction);
    return this.http.get<DevisAuto[]>(`${this.apiUrl}/sort`, { params });
  }
  //SEARCH AGRICULTURE
// Search method
searchDevisAgriculture(keyword: string): Observable<DevisAgriculture[]> {
  return this.http.get<DevisAgriculture[]>(`${this.apiUrl}/agriculture/search?keyword=${keyword}`);
}

// Sort method
sortDevisAgriculture(sortBy: string, direction: string): Observable<DevisAgriculture[]> {
  return this.http.get<DevisAgriculture[]>(`${this.apiUrl}/agriculture/sort?sortBy=${sortBy}&direction=${direction}`);
}

///SEARCH ECOLIA
  // Search method
  searchDevisEcolia(keyword: string): Observable<DevisEcolia[]> {
    return this.http.get<DevisEcolia[]>(`${this.apiUrl}/ecolia/search?keyword=${keyword}`);
}

  // Sort method
  sortDevisEcolia(sortBy: string, direction: string): Observable<DevisEcolia[]> {
    return this.http.get<DevisEcolia[]>(`${this.apiUrl}/ecolia/sort?sortBy=${sortBy}&direction=${direction}`);
  }

  //SEARCH HABITATION
  searchDevis(keyword: string): Observable<DevisHabitation[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<DevisHabitation[]>(`${this.apiUrl}/habitation/search`, { params });
  }

  
  sortDevis(sortBy: string, direction: string): Observable<DevisHabitation[]> {
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('direction', direction);
    return this.http.get<DevisHabitation[]>(`${this.apiUrl}/habitation/sort`, { params });
  }

   // SEARCH DEVIS SANTE
   searchDevisSante(keyword: string, societe: string): Observable<DevisSante[]> {
    return this.http.get<DevisSante[]>(`${this.apiUrl}/sante/search`, {
      params: {
        keyword: keyword || '',
        societe: societe || ''
      }
    });
  }

  sortDevisSante(sortBy: string, direction: string): Observable<DevisSante[]> {
    return this.http.get<DevisSante[]>(`${this.apiUrl}/sante/sort`, {
      params: {
        sortBy,
        direction
      }
    });
  }
  // SEARCH DEVIS VIE
  searchDevisVie(keyword: string, typeContrat: string): Observable<DevisVie[]> {
    return this.http.get<DevisVie[]>(`${this.apiUrl}/vie/search`, {
      params: {
        keyword: keyword || '',
        typeContrat: typeContrat || ''
      }
    });
  }

  sortDevisVie(sortBy: string, direction: string): Observable<DevisVie[]> {
    return this.http.get<DevisVie[]>(`${this.apiUrl}/vie/sort`, {
      params: {
        sortBy,
        direction
      }
    });
  }

  // SEARCH DEVIS VOYAGE
  searchDevisVoyage(params: any): Observable<DevisVoyage[]> {
    return this.http.get<DevisVoyage[]>(`${this.apiUrl}/voyage/search`, { params });
  }

  sortDevisVoyage(sortBy: string, direction: string): Observable<DevisVoyage[]> {
    return this.http.get<DevisVoyage[]>(`${this.apiUrl}/voyage/sort`, {
      params: { sortBy, direction }
    });
  }



  // Base Methods 
  getAllDevis(): Observable<DevisBase[]> {
    return this.http.get<DevisBase[]>(this.apiUrl);
  }
  sendmail(to: string, subject: string, message: string): Observable<string> {
    const params = new HttpParams()
      .set('to', to)
      .set('subject', subject)
      .set('message', message);

    return this.http.post<string>(`${this.apiUrl}/mail/send`, null, { params });
  }
  addDevis(devisBase: DevisBase): Observable<DevisBase> {
    return this.http.post<DevisBase>(this.apiUrl, devisBase);
  }

  updateDevis(id: string, devisBase: DevisBase): Observable<DevisBase> {
    return this.http.put<DevisBase>(`${this.apiUrl}/${id}`, devisBase);
  }

  deleteDevis(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Auto Methods
  getAllDevisAuto(): Observable<DevisAuto[]> {
    return this.http.get<DevisAuto[]>(`${this.apiUrl}/auto`);
  }

  addDevisAuto(devisAuto: DevisAuto): Observable<DevisAuto> {
    return this.http.post<DevisAuto>(`${this.apiUrl}/auto`, devisAuto);
  }

  updateDevisAuto(id: string, devisAuto: DevisAuto): Observable<DevisAuto> {
    return this.http.put<DevisAuto>(`${this.apiUrl}/auto/${id}`, devisAuto).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);
        let errorMsg = 'Error updating devis';
        if (error.status === 404) {
          errorMsg = 'Endpoint not found. Please check the API URL.';
        } else if (error.error instanceof ErrorEvent) {
          errorMsg = `Client-side error: ${error.error.message}`;
        } else {
          errorMsg = `Server error: ${error.status} - ${error.message}`;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  deleteDevisAuto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/auto/${id}`);
  }

  // Voyage Methods
  getAllDevisVoyage(): Observable<DevisVoyage[]> {
    return this.http.get<DevisVoyage[]>(`${this.apiUrl}/voyage`); // Verify this endpoint
  }

 // In your DevisService
addDevisVoyage(devisVoyage: DevisVoyage): Observable<DevisVoyage> {
  return this.http.post<DevisVoyage>(`${this.apiUrl}/voyage`, devisVoyage);
}
  updateDevisVoyage(id: string, devisVoyage: DevisVoyage): Observable<DevisVoyage> {
    const payload = {
      ...devisVoyage,
      dateDepart: devisVoyage.dateDepart.toISOString(),
      dateRetour: devisVoyage.dateRetour.toISOString()
    };
    return this.http.put<DevisVoyage>(`${this.apiUrl}/voyage/${id}`, payload);
  }

  deleteDevisVoyage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/voyage/${id}`);
  }

  // Ecolia Methods
  getAllDevisEcolia(): Observable<DevisEcolia[]> {
    return this.http.get<DevisEcolia[]>(`${this.apiUrl}/ecolia`);
  }

  addDevisEcolia(devisEcolia: DevisEcolia): Observable<DevisEcolia> {
    return this.http.post<DevisEcolia>(`${this.apiUrl}/ecolia`, devisEcolia);
  }

  updateDevisEcolia(id: string, devisEcolia: DevisEcolia): Observable<DevisEcolia> {
    return this.http.put<DevisEcolia>(`${this.apiUrl}/ecolia/${id}`, devisEcolia);
  }

  deleteDevisEcolia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ecolia/${id}`);
  }

  // Habitation Methods
  getAllDevisHabitation(): Observable<DevisHabitation[]> {
    return this.http.get<DevisHabitation[]>(`${this.apiUrl}/habitation`);
  }

  addDevisHabitation(devisHabitation: DevisHabitation): Observable<DevisHabitation> {
    return this.http.post<DevisHabitation>(`${this.apiUrl}/habitation`, devisHabitation);
  }

  updateDevisHabitation(id: string, devisHabitation: DevisHabitation): Observable<DevisHabitation> {
    return this.http.put<DevisHabitation>(`${this.apiUrl}/habitation/${id}`, devisHabitation);
  }

  deleteDevisHabitation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/habitation/${id}`);
  }

  // Sante Methods
  getAllDevisSante(): Observable<DevisSante[]> {
    return this.http.get<DevisSante[]>(`${this.apiUrl}/sante`);
  }

  addDevisSante(devisSante: DevisSante): Observable<DevisSante> {
    return this.http.post<DevisSante>(`${this.apiUrl}/sante`, devisSante);
  }

  updateDevisSante(id: string, devisSante: DevisSante): Observable<DevisSante> {
    return this.http.put<DevisSante>(`${this.apiUrl}/sante/${id}`, devisSante);
  }

  deleteDevisSante(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sante/${id}`);
  }

  // Agriculture Methods
  getAllDevisAgriculture(): Observable<DevisAgriculture[]> {
    return this.http.get<DevisAgriculture[]>(`${this.apiUrl}/agriculture`);
  }

  addDevisAgriculture(devisAgriculture: DevisAgriculture): Observable<DevisAgriculture> {
    const payload = {
      ...devisAgriculture,
      typeAssurance: TypeAssurance.AGRICULTURE,
      etatDevis: EtatDevis.EN_ATTENTE,
      dateDemande: new Date().toISOString()
    };
    return this.http.post<DevisAgriculture>(`${this.apiUrl}/agriculture`, payload);
  }

  updateDevisAgriculture(id: string, devisAgriculture: DevisAgriculture): Observable<DevisAgriculture> {
    return this.http.put<DevisAgriculture>(`${this.apiUrl}/agriculture/${id}`, devisAgriculture);
  }

  deleteDevisAgriculture(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/agriculture/${id}`);
  }

  getDevisAgricultureById(id: string): Observable<DevisAgriculture> {
    return this.http.get<DevisAgriculture>(`${this.apiUrl}/agriculture/${id}`);
  }

  // Vie Methods
  getAllDevisVie(): Observable<DevisVie[]> {
    return this.http.get<DevisVie[]>(`${this.apiUrl}/vie`);
  }

  addDevisVie(devisVie: DevisVie): Observable<DevisVie> {
    const payload = {
      ...devisVie,
      typeAssurance: TypeAssurance.VIE,
      etatDevis: EtatDevis.EN_ATTENTE,
      dateDemande: new Date().toISOString()
    };
    return this.http.post<DevisVie>(`${this.apiUrl}/vie`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateDevisVie(id: string, devisVie: DevisVie): Observable<DevisVie> {
    const payload = {
      ...devisVie,
      typeAssurance: TypeAssurance.VIE,
      dateDemande: devisVie.dateDemande || new Date().toISOString()
    };
    return this.http.put<DevisVie>(`${this.apiUrl}/vie/${id}`, payload);
  }

  deleteDevisVie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vie/${id}`);
  }

  getDevisVieById(id: string): Observable<DevisVie> {
    return this.http.get<DevisVie>(`${this.apiUrl}/vie/${id}`);
  }

  // Helper Methods
  generateDevis(data: any): string {
    const { parentTuteurData, nombreEnfants, primeTotale, dureeContrat, dateEffet } = data;

    return `
      **Validation de votre assurance**
      
      **FORMULE ECOLIA**
      Nombre d'enfant(s) : ${nombreEnfants}
      Prime totale : ${primeTotale} TND
      Durée du contrat : ${dureeContrat} mois
      Date d'effet : ${dateEffet}

      **GARANTIES**
      Cette couverture est accordée aux écoliers, collégiens et lycéens aussi bien au sein de l'établissement scolaire que sur le chemin de l'aller et retour et au cours des excursions.

      A- GARANTIES INDIVIDUELLE ACCIDENTS CORPORELS
      1. Capital en cas de décès accidentel
      2. Capital en cas d'infirmité accidentelle permanente totale ou partielle
      3. Remboursement des frais de traitement suite à un accident
      4. Remboursement des frais d'optique suite à un accident   

      B- GARANTIES ASSISTANCE
      1. Soins d'urgence en cas d'Accident
      2. Transport sanitaire ou Rapatriement
      3. Déplacement et séjour d'un membre de la famille
      4. Assistance psychologique en cas d'Accident ou décès d'un parent
      5. Kinésithérapeute en cas de traumatisme

      **Parent / Tuteur**
      Nom et prénom : ${parentTuteurData.nom} ${parentTuteurData.prenom}
      Pièce d'identité : ${parentTuteurData.pieceIdentite}
      Email : ${parentTuteurData.email}
      Téléphone : ${parentTuteurData.telephone}
      Adresse : ${parentTuteurData.adresse}
      Ville : ${parentTuteurData.ville}
      Code postal : ${parentTuteurData.codePostal}
      Secteur d'activité : ${parentTuteurData.secteurActivite}
      Profession : ${parentTuteurData.profession}

      **Établissement**
      Établissement : ${parentTuteurData.etablissement}
      Activité : ${parentTuteurData.activite}

      **Enfant(s) à assurer**
      Enfant 1:
      Nom: ${data.enfant1.nom}
      Prénom: ${data.enfant1.prenom}
      Date Naissance: ${data.enfant1.dateNaissance}

      J’ai lu et approuvé les conditions d'assurance saisies dans cette page.
    `;
  }


  
}