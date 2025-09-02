

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicos/apiService/api.service';
import { RestauranteResponse } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,

  imports: [CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {


  restaurantes: RestauranteResponse[] = [];
  carregando: boolean = true;
  mensagemErro: string | null = null;


  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.carregarRestaurantes();
  }

  carregarRestaurantes(): void {
    this.carregando = true;
    this.mensagemErro = null;

    this.api.listarRestaurantes().subscribe({
      next: (pagina) => {

        this.restaurantes = pagina.content;
        this.carregando = false;
      },
      error: (err: HttpErrorResponse) => {

        if (err.status === 403 || err.status === 401) {
          this.mensagemErro = "Sua sessão expirou. Por favor, faça login novamente.";
        } else {
          this.mensagemErro = "Falha ao carregar restaurantes. Tente novamente mais tarde.";
        }
        console.error(err);
        this.carregando = false;
      }
    });
  }
}