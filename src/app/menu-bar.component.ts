import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: `<app-nav></app-nav>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class MenuBarComponent {}
