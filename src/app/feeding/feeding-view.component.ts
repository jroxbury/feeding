import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { FeedingComponent } from './feeding.component';

@Component({
  selector: 'app-feeding-view',
  standalone: true,
  imports: [CommonModule, ListComponent, FeedingComponent],
  template: `
    <app-list></app-list>
    <app-feeding></app-feeding>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ],
})
export class FeedingViewComponent {}
