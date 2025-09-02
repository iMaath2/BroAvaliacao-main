

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicos/apiService/api.service';
import { RestauranteDTO } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurante-criar',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './restaurante-criar.component.html',
  styleUrls: ['./restaurante-criar.component.css']
})
export class RestauranteCriarComponent {

  mensagemErro: string | null = null;
  enviando: boolean = false;


  formRestaurante = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Abertura: new FormControl('', [Validators.required]),
    fechamento: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  criarRestaurante() {
    if (this.formRestaurante.invalid) {
      return;
    }

    this.enviando = true;
    this.mensagemErro = null;

    const dadosDoFormulario = this.formRestaurante.value as RestauranteDTO;

    this.api.criarRestaurante(dadosDoFormulario).subscribe({
      next: (restauranteCriado) => {
        console.log('Restaurante criado com sucesso!', restauranteCriado);
        this.enviando = false;

        this.router.navigate(['/restaurantes']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao criar restaurante:', err);
        this.mensagemErro = err.error?.message || 'Ocorreu um erro desconhecido.';
        this.enviando = false;
      }
    });
  }
}