export interface Offre {
    id?: string;
    titre: string;
    description: string;
    montant: number;
    devisId: string;
}

export enum EtatDevis {
    EN_ATTENTE = "EN_ATTENTE",
    VALIDE = "VALIDE",
    REFUSE = "REFUSE",
    ANNULE = "ANNULE"
}

export enum TrancheAge {
    DE_1_A_60_ANS = 'DE_1_A_60_ANS',
    DE_61_A_75_ANS = 'DE_61_A_75_ANS',
    DE_76_A_85_ANS = 'DE_76_A_85_ANS'
}


export enum TypeAssurance {
    HABITATION = "HABITATION",  
    VOYAGE = "VOYAGE",
    AUTO = "AUTO",
    SANTE = "SANTE",
    AGRICULTURE = "AGRICOLE",
    PREVOYANCE = "PREVOYANCE",
    ECOLIA = "ECOLIA",
    VIE = "VIE",
}

export enum Destination {
    // Europe
    FRANCE,
    ALLEMAGNE,
    ESPAGNE,
    ITALIE,
    ROYAUME_UNI,

    // Amérique du Nord
    CANADA,
    ETATS_UNIS,
    MEXIQUE,

    // Asie
    CHINE,
    JAPON,
    INDE,

    // Afrique
    MAROC,
    ALGERIE,
    TUNISIE,

    // Océanie
    AUSTRALIE,
    NOUVELLE_ZELANDE
   
}

export enum ZoneGeographique {
    EUROPE = 'EUROPE',
    AMERIQUE_NORD = 'AMERIQUE_NORD',
    AMERIQUE_SUD = 'AMERIQUE_SUD',
    ASIE = 'ASIE',
    AFRIQUE = 'AFRIQUE',
    OCEANIE = 'OCEANIE',
    MONDE_ENTIER = 'MONDE_ENTIER'
  }

export enum TypeIdentite {
    CIN = 'CIN',
    PASSPORT = 'PASSPORT',
}

export class DevisBase {
    id: string | null;
    montantEstime: number;
    dateDemande?: Date;
    typeAssurance: TypeAssurance;
    etatDevis: EtatDevis;

    constructor(data?: any) {
        this.id = data?.id || '';
        this.montantEstime = data?.montantEstime || 0;
        this.dateDemande = data?.dateDemande ? new Date(data.dateDemande) : new Date();
        this.typeAssurance = data?.typeAssurance || TypeAssurance.HABITATION;
        this.etatDevis = data?.etatDevis || EtatDevis.EN_ATTENTE;
    }
}

export class DevisEcolia extends DevisBase {
    parentTuteurNom: string; // Nom du parent/tuteur
    parentTuteurPieceIdentite: TypeIdentite; // Type de pièce d'identité
    parentTuteurNumPieceIdentite: string; // Numéro de pièce d'identité
    parentTuteurTelephone: string; // Numéro de téléphone
    parentTuteurEmail: string; // Email
    nombreEnfants: number; // Nombre d'enfants à assurer
    dateEffet: Date; // Date d'effet du contrat
    
   
    constructor(data?: any) {
        super(data);
        this.parentTuteurNom = data?.parentTuteurNom || '';
        this.parentTuteurPieceIdentite = data?.parentTuteurPieceIdentite || TypeIdentite.CIN;
        this.parentTuteurNumPieceIdentite = data?.parentTuteurNumPieceIdentite || '';
        this.parentTuteurTelephone = data?.parentTuteurTelephone || '';
        this.parentTuteurEmail = data?.parentTuteurEmail || '';
        this.nombreEnfants = data?.nombreEnfants || 0;
        this.dateEffet = data?.dateEffet ? new Date(data.dateEffet) : new Date();
       
    }
}


// In your devis.model.ts
export class DevisVoyage extends DevisBase {
    dureeContrat: number;
    dateDepart: Date;
    dateRetour: Date;
    destination: Destination;
    trancheAge: TrancheAge;
    zoneGeographique: ZoneGeographique;

    constructor(data?: any) {
        super(data);
        this.dureeContrat = data?.dureeContrat || 0;
        this.dateDepart = data?.dateDepart ? new Date(data.dateDepart) : new Date();
        this.dateRetour = data?.dateRetour ? new Date(data.dateRetour) : new Date();
        this.destination = data?.destination || Destination.FRANCE;
        this.trancheAge = data?.trancheAge || TrancheAge.DE_1_A_60_ANS;
        this.zoneGeographique = data?.zoneGeographique || ZoneGeographique.EUROPE;
    }
}
export enum TypeLogement {
    APPARTEMENT = 'APPARTEMENT',
    MAISON = 'MAISON',
    VILLA = 'VILLA'
  }
export class DevisHabitation extends DevisBase {
    surface: number;          // Surface in m²
    typeLogement: TypeLogement; // Apartment, house, villa
    valeurBien: number;       // Property value
    niveauRisque: string;     // Risk level
    alarmeSecurite: boolean;  // Security alarm presence

    constructor(data?: any) {
        super(data);
        this.surface = data?.surface || 0;
        this.typeLogement = data?.typeLogement || TypeLogement.APPARTEMENT;
        this.valeurBien = data?.valeurBien || 0;
        this.niveauRisque = data?.niveauRisque || 'MOYEN';
        this.alarmeSecurite = data?.alarmeSecurite || false;
    }
}


export enum TypeContrat {
    EPARGNE = 'EPARGNE',
    RETRAITE = 'RETRAITE',
    MIXTE = 'MIXTE'
  }
  
  export class DevisVie extends DevisBase {
    typeContrat: TypeContrat;
    primeMensuelle: number;
    beneficiaire: string;
    rendementEspere: number;
    dureeMinimale: number;
  
    constructor(data?: any) {
      super(data);
      this.typeContrat = data?.typeContrat || TypeContrat.EPARGNE;
      this.primeMensuelle = data?.primeMensuelle || 0;
      this.beneficiaire = data?.beneficiaire || '';
      this.rendementEspere = data?.rendementEspere || 0;
      this.dureeMinimale = data?.dureeMinimale || 5; // Default 5 years
    }
  }
export class DevisSante extends DevisBase {
    contactNom: string;
    contactPrenom: string;
    contactEmail: string;
    contactSociete: string;
    contactFonction: string;
    contactTelephone: string;
    contactDateNaissance: Date;

    constructor(data?: any) {
        super(data);
        this.contactNom = data?.contactNom || '';
        this.contactPrenom = data?.contactPrenom || '';
        this.contactEmail = data?.contactEmail || '';
        this.contactSociete = data?.contactSociete || '';
        this.contactFonction = data?.contactFonction || '';
        this.contactTelephone = data?.contactTelephone || '';
        this.contactDateNaissance = data?.contactDateNaissance ? new Date(data.contactDateNaissance) : new Date();
    }
}

// Classe DevisAuto en dehors de DevisSante
export class DevisAuto extends DevisBase {
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    kilometrage: number;
    typeContrat: string; // Par exemple, "Tous Risques" ou "Au Tiers"
    
    constructor(data?: any) {
        super(data);
        this.immatriculation = data?.immatriculation || '';
        this.marque = data?.marque || '';
        this.modele = data?.modele || '';
        this.annee = data?.annee || new Date().getFullYear();
        this.kilometrage = data?.kilometrage || 0;
        this.typeContrat = data?.typeContrat || '';
    }
}


export enum TypeCulture {
    CEREALES = 'CEREALES',
    FRUITS = 'FRUITS',
    LEGUMES = 'LEGUMES',
    ELEVAGE = 'ELEVAGE',
  }
  
  export class DevisAgriculture extends DevisBase {
    surfaceExploitation: number;  // In hectares
    typeCulture: TypeCulture;     // Culture type enum
    nombreAnimaux: number;        // Number of animals if livestock
    valeurMateriel: number;       // Value of agricultural equipment
    risquesCouverts: string;      // Covered risks (e.g., fire, drought)
    
    constructor(data?: any) {
        super(data);  // This was missing - must call super() first in derived classes
        this.surfaceExploitation = data?.surfaceExploitation || 0;
        this.typeCulture = data?.typeCulture || TypeCulture.CEREALES;
        this.nombreAnimaux = data?.nombreAnimaux || 0;
        this.valeurMateriel = data?.valeurMateriel || 0;
        this.risquesCouverts = data?.risquesCouverts || '';
    }

}

export interface ChatRequest {
    message: string;
  }
  
  export interface ChatResponse {
    response: string;
  }