import { Component } from '@angular/core';
import { MainInputComponent } from "../../components/main-input/main-input.component";
import { DropdownInputComponent } from "../../components/dropdown-input/dropdown-input.component";
import { TextAreaComponent } from "../../components/text-area/text-area.component";
import { RouterLink } from '@angular/router';
import { InputChipsComponent } from "../../components/input-chips/input-chips.component";
import { InputImageComponent } from "../../components/input-image/input-image.component";
import { MainButtonComponent } from "../../components/main-button/main-button.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-store',
  imports: [
    MainInputComponent, 
    DropdownInputComponent, 
    TextAreaComponent, 
    RouterLink, 
    InputChipsComponent, 
    InputImageComponent, 
    MainButtonComponent, 
    NgIf,
    RouterLink
  ],
  templateUrl: './add-store.component.html',
  styleUrl: './add-store.component.scss'
})
export default class AddStoreComponent {
  showSuccessModal = false;

  onAddLoja() {
    // Aqui você colocaria a lógica de cadastro...

    // Depois mostra o modal
    this.showSuccessModal = true;
  }

  closeModal() {
    this.showSuccessModal = false;
  }

}
