import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      const sentMessageDate = new Date(value);
      const todaysDate = new Date();
      const passedTime = Math.floor((todaysDate.getTime() - sentMessageDate.getTime()) / 1000);

      const secsInMin = 60;
      const secsInHour = 3600;
      const secsInDay = 86400;

      if (passedTime < secsInMin) {
        return 'преди по-малко от минута';
      } else if (passedTime < secsInHour) {
        const minutes = Math.floor(passedTime / 60);
        return `преди ${minutes}минут${minutes > 1 ? 'и' : 'а'}`;
      } else if (passedTime < secsInDay) {
        const hours = Math.floor(passedTime / 3600);
        return `преди ${hours} час${hours > 1 ? 'а' : ''}`;
      } else {
        const days = Math.floor(passedTime / 86400);
        return `преди${days}${days > 1 ? 'дни' : 'ден'}`;
      }
    }
    return '';
  }
}
