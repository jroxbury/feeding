import { Injectable } from '@angular/core';
import { DiaperItem } from '../diapers/diaper-list.service';
import { FeedItem } from '../feeding/feeding.service';

export interface ListData<T> {
  id: number;
  list: T[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public copyData<T>(data: ListData<T>) {
    return {
      ...data,
      list: [...data.list],
    };
  }
}
