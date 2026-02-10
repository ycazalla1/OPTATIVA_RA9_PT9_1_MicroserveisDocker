import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [HttpClientModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nom = '';
  resposta = '';

  constructor(private http: HttpClient) {}

  enviarNom() {
    this.http.post<any>('http://localhost:3000/api/hello', {
      nom: this.nom
    }).subscribe({
      next: res => this.resposta = res.missatge,
      error: () => this.resposta = 'Error en el servidor'
    });
  }
}
