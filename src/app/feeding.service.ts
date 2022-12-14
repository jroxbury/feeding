import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Side {
  left = 'left',
  right = 'right',
}

interface FeedRecord {
  id: number;
  startTime: string;
  endTime: string;
  diff: number;
  side: Side;
}
interface Data {
  id: number;
  list: FeedRecord[];
}

@Injectable({
  providedIn: 'root',
})
export class FeedingService {
  private readonly localStorageKey = 'Feeding_App';

  private data: Data;

  private isTracking = new BehaviorSubject<boolean>(false);
  public isTracking$ = this.isTracking.asObservable();

  private feedingData = new BehaviorSubject<Data | null>(null);
  public feedingData$ = this.feedingData.asObservable();

  private startTime!: Date;
  private stopTime!: Date;
  private currentSide!: Side;

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify({
          id: 0,
          list: [],
        })
      );
    }
    this.data = this.getData();
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
      startTime: this.createPrettyTimeStamp(this.startTime),
      endTime: this.createPrettyTimeStamp(this.stopTime),
      diff: this.getDiffInMinutes(this.startTime, this.stopTime),
      side: this.currentSide,
    });
    this.data.id += 1;
    this.setData();
  }

  private createPrettyTimeStamp(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  private getDiffInMinutes(start: Date, finish: Date): number {
    const diffInMilliseconds = Math.abs(start.getTime() - finish.getTime());
    return Math.floor(diffInMilliseconds / (1000 * 60));
  }

  private setData(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
  }

  private getData(): Data {
    const value = localStorage.getItem(this.localStorageKey) as string;
    return JSON.parse(value);
  }

  public deleteItem(id: number): void {
    this.data.list = this.data.list.filter((item) => item.id !== id);
    this.setData();
  }
}
