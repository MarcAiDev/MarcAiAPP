import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-chips',
  imports: [NgFor],
  templateUrl: './input-chips.component.html',
  styleUrl: './input-chips.component.scss'
})
export class InputChipsComponent {
  chipOptions: string[] = ['Alimentação', 'Loja', 'Roupas', 'Social'];
  selectedChips: string[] = [];

  toggleChip(option: string) {
    const index = this.selectedChips.indexOf(option);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(option);
    }
  }

}
