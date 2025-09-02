

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.css']
})
export class LogModalComponent {

  @Input() logs: any[] = [];

  @Input() nomeRestaurante: string = '';

  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}