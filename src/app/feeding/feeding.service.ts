import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, switchMap, timer } from 'rxjs';
import { DateTimeService } from '../shared/date-time.service';
import { StorageService } from '../shared/storage.service';
import { DataService, ListData } from '../shared/data';
import { EditButtonService } from './edit-button.service';

export enum Side {
  left = 'left',
  right = 'right',
}

export interface FeedItem {
  id: number;
  startTime: string;
  endTime: string;
  diff: number;
  side: Side;
}

@Injectable({
  providedIn: 'root',
})
export class FeedingService {
  private readonly localStorageKey = 'Feeding_App';

  private data: ListData<FeedItem>;

  private isTracking = new BehaviorSubject<boolean>(false);
  public isTracking$ = this.isTracking.asObservable();

  private feedingData = new BehaviorSubject<ListData<FeedItem> | null>(null);
  public feedingData$ = this.feedingData.asObservable();

  private timer = new BehaviorSubject<number>(0);
  private time = new ReplaySubject<number>(1);
  public time$ = this.time.asObservable();

  private startTime!: Date;
  private stopTime!: Date;
  private currentSide!: Side;

  private readonly initialData = {
    id: 0,
    list: [],
  };

  constructor(
    private readonly editButtonService: EditButtonService,
    private readonly dateTimeService: DateTimeService,
    private readonly storageService: StorageService,
    private readonly dataService: DataService
  ) {
    this.storageService.initialize(this.localStorageKey, this.initialData);
    this.data = this.storageService.getData(this.localStorageKey);
    this.feedingData.next(this.data);
    this.timer.pipe(switchMap((val) => timer(val, 1000))).subscribe((val) => {
      this.time.next(val);
    });
  }

  public resetData() {
    this.storageService.removeItem(this.localStorageKey);
    this.storageService.initialize(this.localStorageKey, this.initialData);
    this.data = this.dataService.copyData<FeedItem>(this.initialData);
    this.feedingData.next(this.data);
  }

  public startFeeding(side: Side): void {
    this.isTracking.next(true);
    this.currentSide = side;
    this.startTime = new Date();
  }

  public stopFeeding(): void {
    this.stopTime = new Date();
    this.newItem();
    this.feedingData.next(this.data);
    this.isTracking.next(false);
  }

  private newItem(): void {
    this.data.list.unshift({
      id: this.data.id,
      startTime: this.dateTimeService.createPrettyTimeStamp(this.startTime),
      endTime: this.dateTimeService.createPrettyTimeStamp(this.stopTime),
      diff: this.dateTimeService.getDiffInMinutes(
        this.startTime,
        this.stopTime
      ),
      side: this.currentSide,
    });
    this.data.id += 1;
    this.storageService.setData(this.localStorageKey, this.data);
  }

  public deleteItem(id: number): void {
    this.data.list = this.data.list.filter((item) => item.id !== id);
    if (!this.data.list.length) {
      this.editButtonService.setIsEditing(false);
    }
    this.feedingData.next(this.data);
    this.storageService.setData(this.localStorageKey, this.data);
  }

  public startTimer(): void {
    this.timer.next(0);
  }
}
