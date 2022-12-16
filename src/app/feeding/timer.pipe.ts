import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(value: number | null): string {
    if (!value) return '00:00';
    const min = Math.floor(value / 60);
    const minutes = min > 9 ? min : min >= 1 ? `0${min}` : '00';
    const seconds = value % 60 > 9 ? value % 60 : `0${value % 60}`;
    return `${minutes}:${seconds}`;
  }
}
