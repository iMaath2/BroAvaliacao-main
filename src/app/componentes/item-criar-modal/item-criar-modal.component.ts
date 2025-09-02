

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicos/apiService/api.service';
import { ItemDTO } from '../../DTOs/api.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item-criar-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-criar-modal.component.html',
  styleUrls: ['./item-criar-modal.component.css']
})
export class ItemCriarModalComponent {
  @Input() restauranteId!: number; 
  @Output() fechar = new EventEmitter<boolean>(); 

  mensagemErro: string | null = null;
  enviando: boolean = false;

  formItem = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descrição: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private api: ApiService) {}

  criarItem() {
    if (this.formItem.invalid) {
      return;
    }

    this.enviando = true;
    this.mensagemErro = null;
    const dadosItem = this.formItem.value as ItemDTO;

    this.api.criarItem(this.restauranteId, dadosItem).subscribe({
      next: (novoItem) => {
        console.log('Item criado com sucesso:', novoItem);
        this.enviando = false;
        this.fechar.emit(true);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao criar item:', err);
        this.mensagemErro = err.error?.message || 'Ocorreu um erro desconhecido.';
        this.enviando = false;
      }
    });
  }

  onFechar() {
    this.fechar.emit(false);
  }
}