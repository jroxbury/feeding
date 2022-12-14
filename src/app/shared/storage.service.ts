import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public initialize(key: string, data: any) {
    if (!localStorage.getItem(key)) {
      this.setData(key, data);
    }
  }

  public setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any {
    const value = localStorage.getItem(key) as string;
    return JSON.parse(value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
