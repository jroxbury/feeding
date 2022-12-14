import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons.component';
import { DiaperListComponent } from './diaper-list.component';

@Component({
  selector: 'app-diapers',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, DiaperListComponent],
  template: `
    <app-diaper-list></app-diaper-list>
    <app-buttons></app-buttons>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
})
export class DiapersComponent {}
