import { Component } from '@angular/core';
import { MainInputComponent } from "../../components/main-input/main-input.component";
import { MainButtonComponent } from '../../components/main-button/main-button.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { InputChipsComponent } from "../../components/input-chips/input-chips.component";

@Component({
  selector: 'app-register',
  imports: [MainInputComponent, MainButtonComponent, RouterLink, NgIf, RouterLink, InputChipsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {
  showSuccessModal = false;

    onRegister() {
      // Aqui você colocaria a lógica de cadastro...

      // Depois mostra o modal
      this.showSuccessModal = true;
    }

    closeModal() {
      this.showSuccessModal = false;
    }
}
