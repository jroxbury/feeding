import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/">Feeding</a>
      <a routerLink="/diapers">Diapers</a>
    </nav>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
      }
      nav {
        display: flex;
      }
      a {
        font-size: 20px;
        &:not(:first-child) {
          margin-left: 40px;
        }
      }
    `,
  ],
})
export class NavComponent {}
