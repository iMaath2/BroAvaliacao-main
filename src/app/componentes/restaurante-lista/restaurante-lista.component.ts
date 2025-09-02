

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../servicos/apiService/api.service';
import { RestauranteResponse } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurante-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurante-lista.component.html',
  styleUrls: ['./restaurante-lista.component.css']
})
export class RestauranteListaComponent implements OnInit {

  restaurantes: RestauranteResponse[] = [];
  carregando: boolean = true;
  mensagemErro: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.carregarRestaurantes();
  }

  carregarRestaurantes(): void {
    this.carregando = true;
    this.mensagemErro = null;


    this.api.listarRestaurantes().subscribe({

      next: (paginaDeRestaurantes) => {

        this.restaurantes = paginaDeRestaurantes.content;
        this.carregando = false;
      },

      error: (err: HttpErrorResponse) => {
        console.error('Falha ao buscar restaurantes:', err);
        if(err.status === 403 || err.status === 401) {
            this.mensagemErro = 'Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.';
        } else {
            this.mensagemErro = 'Não foi possível carregar os restaurantes. O servidor pode estar offline.';
        }
        this.carregando = false;
      }
    });
  }
}