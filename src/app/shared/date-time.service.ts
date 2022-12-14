import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public createPrettyTimeStamp(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  public getDiffInMinutes(start: Date, finish: Date): number {
    const diffInMilliseconds = Math.abs(start.getTime() - finish.getTime());
    return Math.floor(diffInMilliseconds / (1000 * 60));
  }
}
