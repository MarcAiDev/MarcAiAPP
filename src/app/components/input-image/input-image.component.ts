import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-image',
  imports: [NgIf],
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.scss'
})
export class InputImageComponent {
  selectedFileName: string = '';
  imagePreviewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


}
