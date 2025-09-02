

import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../servicos/apiService/api.service';
import { RestauranteResponse, ItemResponse, LogResponse, ResenhaResponse, ResenhaDTO } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


import { AvaliacoesModalComponent } from '../avaliacoes-modal/avaliacoes-modal.component';
import { LogModalComponent } from '../log-modal/log-modal.component';
import { ItemCriarModalComponent } from '../item-criar-modal/item-criar-modal.component';

@Component({
  selector: 'app-restaurante-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    AvaliacoesModalComponent,
    LogModalComponent,
    ItemCriarModalComponent
  ],
  templateUrl: './restaurante-detalhes.component.html',
  styleUrls: ['./restaurante-detalhes.component.css']
})
export class RestauranteDetalhesComponent implements OnInit {

  restaurante: RestauranteResponse | null = null;
  cardapio: ItemResponse[] = [];
  logs: LogResponse[] = [];
  

  carregando: boolean = true;
  mensagemErro: string | null = null;


  reviewsModalAberto = false;
  carregandoReviews = false;
  reviews: ResenhaResponse[] = [];
  reviewsMensagemErro: string | null = null;
  

  itemModalAberto = false;
  itemSelecionadoParaModal: any = null;
  logModalAberto = false;
  itemCriarModalAberto = false;


  formAvaliacaoRestaurante = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    conteudo: new FormControl('', [Validators.required, Validators.minLength(15)])
  });
  enviandoAvaliacao = false;
  mensagemSucessoAvaliacao: string | null = null;
  mensagemErroAvaliacao: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    const restauranteIdStr = this.route.snapshot.paramMap.get('id');
    if (!restauranteIdStr) {
      this.mensagemErro = "ID do restaurante não encontrado na URL.";
      this.carregando = false;
      return;
    }
    this.carregarDetalhes(+restauranteIdStr);
  }

  carregarDetalhes(id: number): void {
    this.carregando = true;
    this.mensagemErro = null;
    forkJoin({
      paginaRestaurantes: this.api.listarRestaurantes(0, 100),
      paginaItens: this.api.listarItensDoRestaurante(id),
      paginaLogs: this.api.listarLogDoRestaurante(id)
    }).subscribe({
      next: (resultados) => {
        this.restaurante = resultados.paginaRestaurantes.content.find(r => r.id === id) || null;
        if (!this.restaurante) {
          this.mensagemErro = "Restaurante não encontrado.";
        } else {
          this.cardapio = resultados.paginaItens.content;
          this.logs = resultados.paginaLogs.content;
        }
        this.carregando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error("Erro ao carregar detalhes do restaurante:", err);
        this.mensagemErro = "Falha ao carregar os dados do restaurante.";
        this.carregando = false;
      }
    });
  }

  abrirReviewsModal() {
    if (!this.restaurante) return;
    this.reviewsModalAberto = true;
    this.carregandoReviews = true;
    this.reviewsMensagemErro = null;

    this.api.listarResenhasDoRestaurante(this.restaurante.id).subscribe({
      next: (pagina) => {
        this.zone.run(() => {
            this.reviews = pagina.content;
            this.carregandoReviews = false;
        });
      },
      error: (err) => {
        this.zone.run(() => {
            console.error("Erro ao buscar reviews:", err);
            this.reviewsMensagemErro = "Falha ao carregar as avaliações.";
            this.carregandoReviews = false;
        });
      }
    });
  }

  fecharReviewsModal() {
    this.reviewsModalAberto = false;
  }

  enviarAvaliacaoRestaurante() {
    if (this.formAvaliacaoRestaurante.invalid || !this.restaurante) { return; }
    this.enviandoAvaliacao = true;
    this.mensagemErroAvaliacao = null;
    this.mensagemSucessoAvaliacao = null;
    const dadosAvaliacao = this.formAvaliacaoRestaurante.value as ResenhaDTO;

    this.api.criarResenhaRestaurante(this.restaurante.id, dadosAvaliacao).subscribe({
      next: (resenhaCriada) => {
        this.enviandoAvaliacao = false;
        this.mensagemSucessoAvaliacao = "Sua avaliação foi enviada com sucesso!";
        this.formAvaliacaoRestaurante.reset();
        setTimeout(() => this.mensagemSucessoAvaliacao = null, 5000);
      },
      error: (err: HttpErrorResponse) => {
        this.mensagemErroAvaliacao = err.error?.message || 'Ocorreu um erro.';
        this.enviandoAvaliacao = false;
      }
    });
  }

  abrirItemModal(item: any) { this.itemSelecionadoParaModal = item; this.itemModalAberto = true; }
  fecharItemModal() { this.itemModalAberto = false; this.itemSelecionadoParaModal = null; }
  
  abrirLogModal() { this.logModalAberto = true; }
  fecharLogModal() { this.logModalAberto = false; }

  abrirItemCriarModal() { this.itemCriarModalAberto = true; }
  fecharItemCriarModal(itemFoiCriado: boolean) {
    this.itemCriarModalAberto = false;
    if (itemFoiCriado && this.restaurante) {
      this.api.listarItensDoRestaurante(this.restaurante.id).subscribe(pagina => this.cardapio = pagina.content);
    }
  }
}