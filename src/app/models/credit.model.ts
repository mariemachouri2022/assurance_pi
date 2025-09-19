export enum EtatCredit {
  ENCOURS = 'ENCOURS',
  REFUSE = 'REFUSE',
  TERMINE = 'TERMINE'
}

export enum TypeCredit {
  CONSOMMATION = 'CONSOMMATION',
  PERSONNEL = 'PERSONNEL',
  PROFESSIONNEL = 'PROFESSIONNEL',
}

export interface Credit {
  id?: string;
  montant: number;
  tauxInteret: number;
  duree: number;
  typeCredit: TypeCredit; // Utilisation correcte de l'énumération
  etatCredit: EtatCredit; // Utilisation correcte de l'énumération
  historiquePaiements: string;
  scoreRisque?: number; // Modifier ici en `number`
}
