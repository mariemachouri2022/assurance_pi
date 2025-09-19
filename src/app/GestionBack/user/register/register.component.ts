import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../Services/UserService/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  roles: string[] = ['AGENT', 'ADMIN']; // Liste des rôles disponibles

  constructor(private fb: FormBuilder, private authService: UserService) {
    this.registerForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[], Validators.required]  // Tableau de rôles
    });
  }

  // Méthode pour gérer la sélection des rôles
  onRoleChange(event: any, role: string) {
    const roles = this.registerForm.get('roles')?.value;
    if (event.target.checked) {
      roles.push(role); // Ajouter le rôle si coché
    } else {
      const index = roles.indexOf(role);
      if (index > -1) {
        roles.splice(index, 1); // Retirer le rôle si décoché
      }
    }
    this.registerForm.get('roles')?.setValue(roles);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token, response.refreshToken);
          alert('Inscription réussie !');
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'inscription';
        }
      });
    }
  }


}
