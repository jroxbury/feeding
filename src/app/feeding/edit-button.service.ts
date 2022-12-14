import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditButtonService {
  private readonly isEditing = new BehaviorSubject(false);
  public readonly isEditing$ = this.isEditing.asObservable();

  setIsEditing(isEditing: boolean): void {
    this.isEditing.next(isEditing);
  }
}
