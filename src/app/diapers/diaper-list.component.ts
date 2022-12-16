import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaperListService } from './diaper-list.service';

@Component({
  selector: 'app-diaper-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="list$ | async as data">
      <div *ngIf="data.list.length" class="button-container">
        <button (click)="setIsEditing()">Edit</button>
      </div>
      <table>
        <tr>
          <th
            class="delete-column"
            [ngClass]="{ isEditing: isEditing$ | async }"
          >
            Delete
          </th>
          <th>Time</th>
          <th>Type</th>
        </tr>
        <tr *ngFor="let item of data.list">
          <td
            class="delete-column"
            [ngClass]="{ isEditing: isEditing$ | async }"
          >
            <button (click)="deleteRow(item.id)">Delete</button>
          </td>
          <td>{{ item.time }}</td>
          <td>{{ item.type }}</td>
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

      .button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    `,
  ],
})
export class DiaperListComponent {
  public list$ = this.diaperListService.list$;
  public isEditing$ = this.diaperListService.isEditing$;
  constructor(private readonly diaperListService: DiaperListService) {}

  setIsEditing(): void {
    this.diaperListService.setEditMode();
  }

  deleteRow(id: number): void {
    this.diaperListService.deleteItem(id);
  }
}
