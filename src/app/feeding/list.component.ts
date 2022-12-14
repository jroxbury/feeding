import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedingService } from './feeding.service';
import { EditButtonService } from './edit-button.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EditButtonComponent } from './edit-button.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, EditButtonComponent],
  template: `
    <app-edit-button *ngIf="hasListItems$ | async"></app-edit-button>
    <ng-container *ngIf="feedingData$ | async as data">
      <table>
        <tr>
          <th
            class="delete-column"
            [ngClass]="{ isEditing: isEditing$ | async }"
          >
            Delete
          </th>
          <th>Start</th>
          <th>End</th>
          <th>Mins</th>
          <th>Side</th>
        </tr>
        <tr *ngFor="let feeding of data.list">
          <td
            class="delete-column"
            [ngClass]="{ isEditing: isEditing$ | async }"
          >
            <button (click)="deleteRow(feeding.id)">Delete</button>
          </td>
          <td>{{ feeding.startTime }}</td>
          <td>{{ feeding.endTime }}</td>
          <td>{{ feeding.diff }}</td>
          <td>{{ feeding.side }}</td>
        </tr>
      </table>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: scroll;
      }

      table {
        width: 100%;
        text-align: left;
        border-spacing: 0 20px;
        font-size: 20px;
      }

      tr:nth-child(2) {
        background-color: #f2f2f2;
        font-size: 24px;
        font-weight: bold;

        td {
          padding: 20px 0;
        }
      }

      .delete-column {
        display: none;

        &.isEditing {
          display: block;
        }

        button {
          background: firebrick;
          color: white;
          font-weight: bold;
        }
      }
    `,
  ],
})
export class ListComponent {
  public feedingData$ = this.feedingService.feedingData$;
  public isEditing$ = this.editButtonService.isEditing$;
  public hasListItems$: Observable<boolean> =
    this.feedingService.feedingData$.pipe(map((data) => !!data?.list.length));

  constructor(
    private readonly feedingService: FeedingService,
    private readonly editButtonService: EditButtonService
  ) {}

  public deleteRow(id: number) {
    this.feedingService.deleteItem(id);
  }
}
