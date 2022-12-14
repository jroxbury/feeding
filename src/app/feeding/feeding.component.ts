import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedingService, Side } from './feeding.service';

@Component({
  selector: 'app-feeding',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="button-container">
      <button
        [disabled]="isTracking$ | async"
        class="left"
        (click)="start(side.left)"
      >
        Left
      </button>
      <button
        [disabled]="isTracking$ | async"
        class="right"
        (click)="start(side.right)"
      >
        Right
      </button>
    </div>
    <div class="button-container divider">
      <button
        [disabled]="!(isTracking$ | async)"
        class="stop-button"
        (click)="stop()"
      >
        Stop
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        padding: 25px 0;
        display: flex;
        flex-direction: column;
      }
      .button-container {
        display: flex;
        justify-content: space-around;
      }
      .right,
      .left {
        padding: 50px;
        border-radius: 100%;
        font-size: 24px;
        font-weight: bold;
      }

      .divider {
        margin-top: 50px;
      }
      .stop-button {
        background: firebrick;
        width: 200px;
        height: 75px;
        display: block;
        border-radius: 10px;
        font-size: 24px;
        font-weight: bold;
        color: white;

        &:disabled {
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class FeedingComponent {
  public side = Side;
  public isTracking$ = this.feedingService.isTracking$;

  constructor(private readonly feedingService: FeedingService) {}

  public start(side: Side): void {
    this.feedingService.startFeeding(side);
  }

  public stop(): void {
    this.feedingService.stopFeeding();
  }
}
