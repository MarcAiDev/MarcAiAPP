import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-main-input',
  standalone: true,
  imports: [],
  templateUrl: './main-input.component.html',
  styleUrl: './main-input.component.scss'
})
export class MainInputComponent {
  @Input() label:string = "";
  @Input() placeholder:string = "";
  @Input() type:string = "";
  @Input() iconSrc: string = '';
}
