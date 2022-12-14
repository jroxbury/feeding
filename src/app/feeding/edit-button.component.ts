import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonService } from './edit-button.service';
import { FeedingService } from './feeding.service';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [disabled]="isTracking$ | async" (click)="reset()">
      Clear All
    </button>
    <button
      [disabled]="isTracking$ | async"
      class="edit-button"
      (click)="editMode()"
    >
      Edit
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: flex-end;
        margin: 20px 0;
      }

      .edit-button {
        margin-left: 40px;
      }
    `,
  ],
})
export class EditButtonComponent {
  isTracking$ = this.feedingService.isTracking$;

  constructor(
    private readonly editButtonService: EditButtonService,
    private readonly feedingService: FeedingService
  ) {}

  private isEditing = false;
  public editMode(): void {
    this.isEditing = !this.isEditing;
    this.editButtonService.setIsEditing(this.isEditing);
  }

  public reset() {
    if (confirm('Are you sure you want to clear all data?')) {
      this.feedingService.resetData();
    }
  }
}
