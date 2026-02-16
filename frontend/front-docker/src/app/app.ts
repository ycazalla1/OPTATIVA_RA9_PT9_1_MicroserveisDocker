import { ChangeDetectorRef, Component, signal } from '@angular/core';
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
  // Propietats del component
  nom = ''; // El nom introduït per l'usuari
  resposta = ''; // La resposta del servidor

  /**
   * Constructor del component
   * @param http Servei d'Angular per fer peticions HTTP
   * @param cdr Permet forçar la detecció de canvis manualment
   */
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
  }

  /**
   * Funció que s'executa quan l'usuari fa clic al botó "Enviar". Envia el nom al servidor i actualitza la resposta.
   */
  enviarNom() {
    // Mostra en consola el nom enviat
    console.log("Nom enviat:", this.nom);
    // Fa una petició HTTP POST al backend
    this.http.post<any>('http://localhost:3000/api/hello', {
      nom: this.nom
    }).subscribe({
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
