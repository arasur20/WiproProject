import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {

  @Input() isOpen = false;
  @Input() title = '';
  @Input() message = '';

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();  // notify parent
  }
}
