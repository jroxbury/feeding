import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedingService, Side } from './feeding.service';
import { TimerPipe } from './timer.pipe';

@Component({
  selector: 'app-feeding',
  standalone: true,
  imports: [CommonModule, TimerPipe],
  template: `
    <ng-container *ngIf="!(isTracking$ | async)">
      <div class="button-container">
        <button class="left" (click)="start(side.left)">Left</button>
        <button class="right" (click)="start(side.right)">Right</button>
      </div>
    </ng-container>
    <ng-container *ngIf="isTracking$ | async">
      <div class="timer-container">
        <div class="timer">{{ time$ | async | timer }}</div>
        <button
          [disabled]="!(isTracking$ | async)"
          class="stop-button"
          (click)="stop()"
        >
          Stop
        </button>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
      }
      .button-container {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
      }
      .timer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .right,
      .left {
        background-color: var(--medium-plus);
        color: white;
        padding: 50px;
        border-radius: 100%;
        font-size: 24px;
        font-weight: bold;
      }

      .stop-button {
        background: var(--medium-plus);
        color: white;
        width: 200px;
        height: 75px;
        display: block;
        border-radius: 10px;
        font-size: 24px;
        font-weight: bold;

        &:disabled {
          opacity: 0.5;
        }
      }

      .timer {
        font-family: 'Share Tech Mono', monospace;
        font-size: 70px;
        letter-spacing: 0.05em;
        text-align: center;
        color: var(--medium);
        text-shadow: 2px 2px 4px var(--light-plus);
        border-radius: 20px;
        padding: 0 50px 10px;
      }
    `,
  ],
})
export class FeedingComponent {
  public side = Side;
  public isTracking$ = this.feedingService.isTracking$;
  public time$ = this.feedingService.time$;

  constructor(private readonly feedingService: FeedingService) {
    console.log('init');
  }

  public start(side: Side): void {
    this.feedingService.startTimer();
    this.feedingService.startFeeding(side);
  }

  public stop(): void {
    this.feedingService.stopFeeding();
  }
}
