import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./Back/index/index.component";
import {RegistreComponent} from "./Back/registre/registre.component";
import {LoginComponent} from "./Back/login/login.component";
import {ChartsComponent} from "./Back/charts/charts.component";
import {TablesComponent} from "./Back/tables/tables.component";
import {ButtonsComponent} from "./Back/buttons/buttons.component";
import {DropdownsComponent} from "./Back/dropdowns/dropdowns.component";
import {BasicElementsComponent} from "./Back/basic-elements/basic-elements.component";
import {IndexFrontComponent} from "./Front/index-front/index-front.component";
import {AboutComponent} from "./Front/about/about.component";
import {ContactComponent} from "./Front/contact/contact.component";
import {PricingComponent} from "./Front/pricing/pricing.component";
import {ServicesComponent} from "./Front/services/services.component";
import {ShopsComponent} from "./Front/shops/shops.component";
import {ListeCreditComponent} from "./GestionBack/credit/liste-credit/liste-credit.component";
import {AddCreditComponent} from "./GestionBack/credit/add-credit/add-credit.component";
import {UpdateCreditComponent} from "./GestionBack/credit/update-credit/update-credit.component";
import {AffichageCreditComponent} from "./GestionFront/credit/affichage-credit/affichage-credit.component";
import {RegisterUserComponent} from "./GestionBack/user/register/register.component";
import {LoginUserComponent} from "./GestionBack/user/login/login.component";
import {AddSinistreComponent} from "./GestionBack/sinistre/add-sinistre/add-sinistre.component";
import {UpdateSinistreComponent} from "./GestionBack/sinistre/update-sinistre/update-sinistre.component";
import {ListeSinistreComponent} from "./GestionBack/sinistre/liste-sinistre/liste-sinistre.component";
import {DashboardComponent} from "./GestionBack/Dashboard/dashboard/dashboard.component";
import {ListProduitComponent} from "./GestionBack/produit/listproduit/listproduit.component";
import {AjoutproduitComponent} from "./GestionBack/produit/ajoutproduit/ajoutproduit.component";
import {UpdateproduitComponent} from "./GestionBack/produit/updateproduit/updateproduit.component";
import {ListeContractComponent} from "./GestionBack/contract/liste-contract/liste-contract.component";
import {AddContractComponent} from "./GestionBack/contract/add-contract/add-contract.component";
import {UpdateContractComponent} from "./GestionBack/contract/update-contract/update-contract.component";


import {AcceuilDevisComponent} from "./GestionFront/devis/acceuil-devis/acceuil-devis.component";
import {VoyageFormComponent} from "./GestionFront/devis/voyage-form/voyage-form.component";
import {SanteFormComponent} from "./GestionFront/devis/sante-form/sante-form.component";
import {AddDevisComponent} from "./GestionBack/devis/add-devis/add-devis.component";
import {AdddevisAutoComponent} from "./GestionFront/devis/adddevis-auto/adddevis-auto.component";
import {AdddevisEcoliaComponent} from "./GestionFront/devis/adddevis-ecolia/adddevis-ecolia.component";
import {ListeDevisAutoComponent} from "./GestionBack/devis/liste-devis-auto/liste-devis-auto.component";
import {ListeDevisEcoliaComponent} from "./GestionBack/devis/liste-devis-ecolia/liste-devis-ecolia.component";
import {ListeDevisVoyageComponent} from "./GestionBack/devis/liste-devis-voyage/liste-devis-voyage.component";
import {VieFormComponent} from "./GestionFront/devis/vie-form/vie-form.component";
import {AgricultureFormComponent} from "./GestionFront/devis/agriculture-form/agriculture-form.component";
import {HabitationFormComponent} from "./GestionFront/devis/habitation-form/habitation-form.component";
import {ListeDevisAgricultureComponent} from "./GestionBack/devis/liste-devis-agriculture/liste-devis-agriculture.component";
import {ListeDevisHabitationComponent} from "./GestionBack/devis/liste-devis-habitation/liste-devis-habitation.component";
import {ListeDevisVieComponent} from "./GestionBack/devis/liste-devis-vie/liste-devis-vie.component";
import {ListeDevisSanteComponent} from "./GestionBack/devis/liste-devis-sante/liste-devis-sante.component";
import { AssuranceFormComponent } from './assurance-form/assurance-form.component';


const routes: Routes = [
  { path: 'Index', component: IndexComponent },
  { path: 'Registre', component: RegistreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'Tables', component: TablesComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'dropdowns', component: DropdownsComponent },
  { path: 'basic_elements', component: BasicElementsComponent },
  { path: 'IndexFront', component: IndexFrontComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'ListeCredit', component: ListeCreditComponent },
  { path: 'AddCredit', component: AddCreditComponent },
  { path: 'update-credit/:id', component: UpdateCreditComponent },
  { path: 'affichage', component: AffichageCreditComponent },
  { path: 'Registre_user', component: RegisterUserComponent },
  { path: 'Login_user', component: LoginUserComponent },
  { path: 'Dash', component: DashboardComponent },



  { path: 'AddSinistre', component: AddSinistreComponent },
  { path: 'UpdateSinistre/:id', component: UpdateSinistreComponent },
  { path: 'AffichageSinistre', component: ListeSinistreComponent },



  { path: 'ListeProduit', component: ListProduitComponent },
  { path: 'AddProduit', component: AjoutproduitComponent },
  { path: 'UpdateProduit/:id', component: UpdateproduitComponent },



  { path: 'ListeContrat', component: ListeContractComponent },
  { path: 'AddContrat', component: AddContractComponent },
  { path: 'UpdateContrat/:id', component: UpdateContractComponent },


 
  { path: 'AddDevis', component: AddDevisComponent },
  { path: 'AcceuilDevis', component: AcceuilDevisComponent },
  { path: 'voyage-form', component: VoyageFormComponent },
  // Alternative if you want to support both cases
  { path: 'VoyageForm', redirectTo: 'voyage-form', pathMatch: 'full' },
  
  { path: 'AdddevisAuto', component: AdddevisAutoComponent },
  { path: 'AdddevisEcolia', component: AdddevisEcoliaComponent },
  { path: 'SanteForm', component: SanteFormComponent },
  { path: 'HabitationForm', component: HabitationFormComponent },
  { path: 'AgricultureForm', component: AgricultureFormComponent },
  { path: 'VieForm', component: VieFormComponent },
  { path: 'ListeDevisAgriculture', component: ListeDevisAgricultureComponent },
  { path: 'ListeDevisHabitation', component: ListeDevisHabitationComponent },
  { path: 'ListeDevisVie', component: ListeDevisVieComponent },
  { path: 'ListeDevisSante', component: ListeDevisSanteComponent },
  { path: 'ListeDevisAuto', component: ListeDevisAutoComponent },
  { path: 'ListeDevisEcolia', component: ListeDevisEcoliaComponent },
  { path: 'ListeDevisVoyage', component: ListeDevisVoyageComponent },
  { path: 'AssuranceForm', component: AssuranceFormComponent },

  

  
 










































];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
