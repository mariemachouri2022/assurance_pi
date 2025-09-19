import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Services/UserService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginUserComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = ''; // Nouveau message de succès

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token, response.refreshToken);
          this.successMessage = 'Connexion réussie !'; // Affiche le message de succès
          this.errorMessage = ''; // Efface le message d'erreur
          setTimeout(() => {
            this.router.navigate(['/Dash']); // Redirection après 2 secondes
          }, 2000);
        },
        error: () => {
          this.errorMessage = 'Email ou mot de passe incorrect';
          this.successMessage = ''; // Efface le message de succès
        }
      });
    }
  }
}
