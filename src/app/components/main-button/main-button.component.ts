import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss'
})
export class MainButtonComponent {
  @Input() button_text:string = "";
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleclick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
