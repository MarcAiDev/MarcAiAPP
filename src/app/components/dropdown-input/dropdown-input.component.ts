import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-input',
  imports: [NgIf,NgFor],
  templateUrl: './dropdown-input.component.html',
  styleUrl: './dropdown-input.component.scss'
})
export class DropdownInputComponent {
  options = ['Feirante', 'Turista'];
  selectedOption: string | null = null;
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.dropdownOpen = false;
  }
}
