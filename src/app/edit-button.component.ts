import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonService } from './edit-button.service';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <button (click)="editMode()">Edit</button> `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
      }
    `,
  ],
})
export class EditButtonComponent {
  constructor(private readonly editButtonService: EditButtonService) {}

  private isEditing = false;
  public editMode(): void {
    this.isEditing = !this.isEditing;
    this.editButtonService.setIsEditing(this.isEditing);
  }
}
