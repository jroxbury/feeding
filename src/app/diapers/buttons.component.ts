import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PottyType, DiaperListService } from './diaper-list.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="button-container">
      <button (click)="setType(type.wet)">Wet</button>
      <button (click)="setType(type.poopy)">Poopy</button>
      <button (click)="setType(type.mixed)">Mixed</button>
    </div>
  `,
  styles: [
    `
      .button-container {
        margin: 40px 0;
        display: flex;
        justify-content: space-around;
      }

      button {
        width: 100px;
        height: 50px;
        padding: 5px;
      }
    `,
  ],
})
export class ButtonsComponent {
  type = PottyType;

  constructor(private readonly diaperListService: DiaperListService) {}

  setType(type: PottyType) {
    this.diaperListService.track(type);
  }
}
