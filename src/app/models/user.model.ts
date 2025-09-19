export type Role = 'AGENT' | 'ADMIN';  // Enum des rôles

export interface User {
  cin: string;
  nom: string;
  prenom: string;
  adresse: string;
  email: string;
  password: string;
  roles: Role[];  // Liste de rôles
}

export interface SignUpRequest {
  cin: string;
  nom: string;
  prenom: string;
  adresse: string;
  email: string;
  password: string;
  roles: Role[];  // L'utilisateur choisit plusieurs rôles à l'inscription
}



export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}
