import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil-devis',
  templateUrl: './acceuil-devis.component.html',
  styleUrls: ['./acceuil-devis.component.css']
})
export class AcceuilDevisComponent implements OnInit, AfterViewInit {
  logoPath = "src/assets/Front/images/logo.png"  
  showEcoliaForm = false;
  showSearchOverlay = false;
  currentLanguage = 'Français';
  
  devisTypes = [
    { id: 'auto', label: 'Devis Auto', imageSrc: 'assets/Front/images/automobile.png', route: '/AddDevisAuto', description: 'Comprehensive auto insurance for your vehicle protection' },
    { id: 'sante', label: 'Devis Santé', imageSrc: 'assets/Front/images/sante.jpg', route: '/SanteForm', description: 'Health insurance plans for individuals and families' },
    { id: 'habitation', label: 'Devis Habitation', imageSrc: 'assets/Front/images/habitation.jpg', route: '/HabitationForm', description: 'Home insurance to protect your property and belongings' },
    { id: 'voyage', label: 'Devis Voyage', imageSrc: 'assets/Front/images/voyage.jpg', route: '/VoyageForm', description: 'Travel insurance for worry-free journeys worldwide' },
    { id: 'Agriculture', label: 'Devis Agriculture', imageSrc: 'assets/Front/images/agriculture.jpg', route: '/AgricultureForm', description: 'Specialized insurance for agricultural businesses and farms' },
    { id: 'Ecolia', label: 'Devis Ecolia', imageSrc: 'assets/Front/images/ecolia.jpg', route: '/EcoliaForm', description: 'Educational insurance solutions for students and institutions' },
    { id: 'Prevoyance', label: 'Prevoyance Insurance', imageSrc: 'assets/Front/images/Prevoyance.jpg', route: '/AddDevisPrevoyance', description: 'Comprehensive coverage for your Prevoyance needs' },
    { id: 'Life', label: 'Life Insurance', imageSrc: 'assets/Front/images/life.jpg', route: '/VieForm', description: 'Secure your family\'s future with our life insurance plans' }
  ];

  activeNavItem: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization logic
    this.setActiveNavItem();
    console.log("Logo path:", this.logoPath);
  }

  ngAfterViewInit(): void {
    // Animation for cards on load
    this.animateCardsOnLoad();
  }


  changeLanguage(lang: string) {
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event('change'));
      this.currentLanguage = this.getLanguageName(lang);
    } else {
      console.error('Google Translate dropdown not found.');
    }
  }
  
  getLanguageName(code: string): string {
    const languages: {[key: string]: string} = {
      'fr': 'Français',
      'en': 'English',
      'ar': 'العربية'
    };
    return languages[code] || code;
  }


  navigateToEcoliaForm(): void {
    this.router.navigate(['/ecolia-form']);
  } 

  

  navigateToDevis(route: string): void {
    this.router.navigate(['/AcceuilDevis', route]);
  }

  toggleSearchOverlay(): void {
    this.showSearchOverlay = !this.showSearchOverlay;
  }

  setActiveNavItem(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('home')) {
      this.activeNavItem = 'home';
    } else if (currentUrl.includes('about')) {
      this.activeNavItem = 'about';
    } else if (currentUrl.includes('pricing')) {
      this.activeNavItem = 'pricing';
    } else if (currentUrl.includes('shop')) {
      this.activeNavItem = 'shop';
    } else if (currentUrl.includes('services')) {
      this.activeNavItem = 'services';
    } else if (currentUrl.includes('blog')) {
      this.activeNavItem = 'blog';
    } else if (currentUrl.includes('contact')) {
      this.activeNavItem = 'contact';
    } else if (currentUrl.includes('devis')) {
      this.activeNavItem = 'devis';
    }
  }

  private animateCardsOnLoad(): void {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
}
