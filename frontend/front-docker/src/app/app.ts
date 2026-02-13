import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nom = '';
  resposta = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
  }

  enviarNom() {
    console.log("Nom enviat:", this.nom);
    this.http.post<any>('http://localhost:3000/api/hello', {
      nom: this.nom
    }).subscribe({
      // next: res => this.resposta = res.missatge,
      // error: () => this.resposta = 'Error en el servidor'
      next: res => {
        this.resposta = res.missatge;
        this.cdr.detectChanges();
      },
      error: () => {
        this.resposta = 'Error en el servidor';
        this.cdr.detectChanges();
      }
    });
  }
}
