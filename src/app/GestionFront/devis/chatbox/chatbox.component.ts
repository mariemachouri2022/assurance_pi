import { Component, OnInit } from '@angular/core';
import { DevisService } from 'src/app/Services/DevisService/devis-service.service';
import { ChatService } from 'src/app/Services/DevisService/chat.service';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit{
  userMessage = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  userInput: string = ''; // <-- This was missing
  isOpen: boolean = false;
  toggleChat() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    this.messages.push({
      from: 'bot',
      text: "👋 Bonjour et bienvenue sur Assurance Maghribia ! Je suis MaghribiaBot, votre assistant IA. Posez-moi toutes vos questions concernant les devis, contrats ou garanties."
    });
  }

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ from: 'user', text: this.userInput });

    this.chatService.sendMessage(this.userInput).subscribe({
      next: (response) => {
        this.messages.push({ from: 'bot', text: response.response });
        this.userInput = ''; // clear input
      },
      error: (err) => {
        this.messages.push({ from: 'bot', text: 'Erreur lors de la communication avec le serveur.' });
        console.error(err);
      }
    });
  }

}
