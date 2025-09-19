import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './Back/index/index.component';
import { RegistreComponent } from './Back/registre/registre.component';
import { LoginComponent } from './Back/login/login.component';
import { ChartsComponent } from './Back/charts/charts.component';
import { TablesComponent } from './Back/tables/tables.component';
import { ButtonsComponent } from './Back/buttons/buttons.component';
import { DropdownsComponent } from './Back/dropdowns/dropdowns.component';
import { TypographyComponent } from './Back/typography/typography.component';
import { BasicElementsComponent } from './Back/basic-elements/basic-elements.component';
import { IndexFrontComponent } from './Front/index-front/index-front.component';
import { AboutComponent } from './Front/about/about.component';
import { ContactComponent } from './Front/contact/contact.component';
import { PricingComponent } from './Front/pricing/pricing.component';
import { ServicesComponent } from './Front/services/services.component';
import { ShopsComponent } from './Front/shops/shops.component';



import { ListeCreditComponent } from './GestionBack/credit/liste-credit/liste-credit.component';
import {HttpClientModule} from "@angular/common/http";
import { AddCreditComponent } from './GestionBack/credit/add-credit/add-credit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateCreditComponent } from './GestionBack/credit/update-credit/update-credit.component';
import { AffichageCreditComponent } from './GestionFront/credit/affichage-credit/affichage-credit.component';
import { RegisterUserComponent} from './GestionBack/user/register/register.component';
import {LoginUserComponent} from "./GestionBack/user/login/login.component";
import {AddSinistreComponent} from "./GestionBack/sinistre/add-sinistre/add-sinistre.component";
import {ListeSinistreComponent} from "./GestionBack/sinistre/liste-sinistre/liste-sinistre.component";
import {UpdateSinistreComponent} from "./GestionBack/sinistre/update-sinistre/update-sinistre.component";
import { DashboardComponent } from './GestionBack/Dashboard/dashboard/dashboard.component';
import {AjoutproduitComponent} from "./GestionBack/produit/ajoutproduit/ajoutproduit.component";
import {ListProduitComponent} from "./GestionBack/produit/listproduit/listproduit.component";
import {UpdateproduitComponent} from "./GestionBack/produit/updateproduit/updateproduit.component";
import {AddContractComponent} from "./GestionBack/contract/add-contract/add-contract.component";
import {ListeContractComponent} from "./GestionBack/contract/liste-contract/liste-contract.component";
import {UpdateContractComponent} from "./GestionBack/contract/update-contract/update-contract.component";



import { AcceuilDevisComponent } from './GestionFront/devis/acceuil-devis/acceuil-devis.component';
import { VoyageFormComponent } from './GestionFront/devis/voyage-form/voyage-form.component';
import { SanteFormComponent } from './GestionFront/devis/sante-form/sante-form.component';
import { HabitationFormComponent } from './GestionFront/devis/habitation-form/habitation-form.component';

import { AgricultureFormComponent } from './GestionFront/devis/agriculture-form/agriculture-form.component';
import { VieFormComponent } from './GestionFront/devis/vie-form/vie-form.component';
import { AddDevisComponent } from './GestionBack/devis/add-devis/add-devis.component';
import { AdddevisAutoComponent } from './GestionFront/devis/adddevis-auto/adddevis-auto.component';
import { AdddevisEcoliaComponent } from './GestionFront/devis/adddevis-ecolia/adddevis-ecolia.component';
import { ListeDevisAutoComponent } from './GestionBack/devis/liste-devis-auto/liste-devis-auto.component';
import { ListeDevisEcoliaComponent } from './GestionBack/devis/liste-devis-ecolia/liste-devis-ecolia.component';
import { ListeDevisVoyageComponent } from './GestionBack/devis/liste-devis-voyage/liste-devis-voyage.component';
import { ListeDevisAgricultureComponent } from './GestionBack/devis/liste-devis-agriculture/liste-devis-agriculture.component';
import { ListeDevisVieComponent } from './GestionBack/devis/liste-devis-vie/liste-devis-vie.component';
import { ListeDevisSanteComponent } from './GestionBack/devis/liste-devis-sante/liste-devis-sante.component';
import { ListeDevisHabitationComponent } from './GestionBack/devis/liste-devis-habitation/liste-devis-habitation.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { ChatboxComponent } from './GestionFront/devis/chatbox/chatbox.component';
import { AssuranceFormComponent } from './assurance-form/assurance-form.component';



@NgModule({
  declarations: [
    
    AppComponent,
    IndexComponent,
    RegistreComponent,
    LoginComponent,
    ChartsComponent,
    TablesComponent,
    ButtonsComponent,
    DropdownsComponent,
    TypographyComponent,
    BasicElementsComponent,
    IndexFrontComponent,
    AboutComponent,
    ContactComponent,
    PricingComponent,
    ServicesComponent,
    ShopsComponent,

    ListeCreditComponent,
     AddCreditComponent,
     UpdateCreditComponent,
     AffichageCreditComponent,
     RegisterUserComponent,
    LoginUserComponent,
    AddSinistreComponent,
    ListeSinistreComponent,
    UpdateSinistreComponent,
    DashboardComponent,
    AjoutproduitComponent,
    ListProduitComponent,
    UpdateproduitComponent,
    AddContractComponent,
    ListeContractComponent,
    UpdateContractComponent,

  
    
       AcceuilDevisComponent,
       VoyageFormComponent,
       
       SanteFormComponent,
       HabitationFormComponent,
       
       AgricultureFormComponent,
       VieFormComponent,
       AddDevisComponent,
       AdddevisAutoComponent,
       AdddevisEcoliaComponent,
       ListeDevisAutoComponent,
       ListeDevisEcoliaComponent,
       ListeDevisVoyageComponent,
       ListeDevisAgricultureComponent,
       ListeDevisVieComponent,
       ListeDevisSanteComponent,
       ListeDevisHabitationComponent,
       ChatboxComponent,
       AssuranceFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // ✅ Nécessaire pour faire des requêtes HTTP
    ReactiveFormsModule,
    FormsModule,
    AngularToastifyModule
    // ✅ Ajoute ceci pour activer formGroup


  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
