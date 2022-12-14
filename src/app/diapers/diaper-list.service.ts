import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateTimeService } from '../shared/date-time.service';
import { StorageService } from '../shared/storage.service';
import { DataService, ListData } from '../shared/data';

export enum PottyType {
  wet = 'wet',
  poopy = 'poopy',
  mixed = 'mixed',
}

export interface DiaperItem {
  id: number;
  time: string;
  type: PottyType;
}

@Injectable({
  providedIn: 'root',
})
export class DiaperListService {
  private readonly localStorageKey = 'Diapers_App';

  private data: ListData<DiaperItem>;
  private readonly initialData = {
    id: 0,
    list: [],
  };

  private readonly list = new BehaviorSubject<ListData<DiaperItem> | null>(
    null
  );
  public readonly list$ = this.list.asObservable();

  private editMode = false;
  private readonly isEditing = new BehaviorSubject<boolean>(this.editMode);
  public readonly isEditing$ = this.isEditing.asObservable();

  constructor(
    private readonly dateTimeService: DateTimeService,
    private readonly storageService: StorageService,
    private readonly dataService: DataService
  ) {
    this.storageService.initialize(this.localStorageKey, this.initialData);
    this.data = this.storageService.getData(this.localStorageKey);
    this.list.next(this.data);
  }

  public track(type: PottyType) {
    this.data.list.unshift({
      id: this.data.id,
      time: this.dateTimeService.createPrettyTimeStamp(new Date()),
      type,
    });
    this.data.id += 1;
    this.storageService.setData(this.localStorageKey, this.data);
  }

  public deleteItem(id: number) {
    this.data.list = this.data.list.filter((item) => id !== item.id);
    if (!this.data.list.length) {
      this.editMode = false;
      this.isEditing.next(false);
    }
    this.list.next(this.data);
    this.storageService.setData(this.localStorageKey, this.data);
  }

  public setEditMode(): void {
    this.editMode = !this.editMode;
    this.isEditing.next(this.editMode);
  }

  public resetData() {
    this.storageService.removeItem(this.localStorageKey);
    this.storageService.initialize(this.localStorageKey, this.initialData);
    this.data = this.dataService.copyData<DiaperItem>(this.initialData);
    this.list.next(this.data);
  }
}
