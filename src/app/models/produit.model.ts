export enum TypeProduit {
    VIE = 'VIE',
    HABITATION = 'HABITATION',
    SANTE = 'SANTE',
    AUTO = 'AUTO',}
    
    export interface Produit {
    id?: string;
    type: string;
    Description: string;
    Tarifs: number;
    Image:string;
    imageBase64?: string; 
  }
  