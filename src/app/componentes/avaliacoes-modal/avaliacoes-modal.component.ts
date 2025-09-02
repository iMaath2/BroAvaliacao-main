

import { Component, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicos/apiService/api.service';
import { ResenhaResponse, ResenhaDTO } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-avaliacoes-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './avaliacoes-modal.component.html',
  styleUrls: ['./avaliacoes-modal.component.css']
})
export class AvaliacoesModalComponent implements OnInit {
  @Input() itemSelecionado: any;
  @Output() fecharModal = new EventEmitter<void>();


  avaliacoes: ResenhaResponse[] = [];
  carregando = true;
  mensagemErro: string | null = null;


  formAvaliacao = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    conteudo: new FormControl('', [Validators.required, Validators.minLength(15)]),

  });
  enviandoAvaliacao = false;
  mensagemSucesso: string | null = null;

  constructor(private api: ApiService, private zone: NgZone) {}

  ngOnInit(): void {
    if (this.itemSelecionado && this.itemSelecionado.id) {
      this.carregarAvaliacoes();
    } else {
      this.mensagemErro = 'Item não identificado.';
      this.carregando = false;
    }
  }

  carregarAvaliacoes(): void {
    this.carregando = true;
    this.mensagemErro = null;
    this.api.listarResenhasDoItem(this.itemSelecionado.id).subscribe({
      next: (pagina) => {
        this.zone.run(() => {
          this.avaliacoes = pagina.content;
          this.carregando = false;
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error("Erro ao carregar avaliações do item:", err);
          this.mensagemErro = 'Não foi possível carregar as avaliações.';
          this.carregando = false;
        });
      }
    });
  }

  enviarAvaliacao() {
    if (this.formAvaliacao.invalid) return;

    this.enviandoAvaliacao = true;
    this.mensagemSucesso = null;
    const dados = this.formAvaliacao.value as ResenhaDTO;

    this.api.criarResenhaItem(this.itemSelecionado.id, dados).subscribe({
      next: (novaAvaliacao) => {
        this.zone.run(() => {

          this.avaliacoes.unshift(novaAvaliacao);
          this.formAvaliacao.reset();
          this.enviandoAvaliacao = false;
          this.mensagemSucesso = "Avaliação enviada com sucesso!";
          setTimeout(() => this.mensagemSucesso = null, 4000);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.zone.run(() => {
          console.error("Erro ao enviar avaliação do item:", err);
          this.enviandoAvaliacao = false;

        });
      }
    });
  }

  onFechar() {
    this.fecharModal.emit();
  }
}