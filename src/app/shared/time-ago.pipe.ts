import { computed, OnDestroy, Pipe, PipeTransform, Signal, signal, WritableSignal } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTime: WritableSignal<number> = signal(Date.now());
  private intervalId: any;
  private msInMin = 60000;
  private msInHour = 3600000;
  private msInDay = 86400000;
  private lastInterval: number = 1000;
  constructor() {
    this.updateTimer(1000);
  }

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    const timeAgoSignal = computed(() => {
      let now = this.currentTime();
      const sentMessageDate = new Date(value);
      const todaysDate = new Date();
      const passedTimeMs = Math.floor(todaysDate.getTime() - sentMessageDate.getTime());

      this.adjustIntervalAccordingPastTime(passedTimeMs);
      return this.getTimeAgo(passedTimeMs);
    });
    return timeAgoSignal();
  }

  private getTimeAgo(milliseconds: number): string {
    if (milliseconds < this.msInMin) {
      return 'преди по-малко от минута';
    } else if (milliseconds < this.msInHour) {
      const minutes = Math.floor(milliseconds / this.msInMin);
      return `преди ${minutes} минут${minutes > 1 ? 'и' : 'а'}`;
    } else if (milliseconds < this.msInDay) {
      const hours = Math.floor(milliseconds / this.msInHour);
      return `преди ${hours} час${hours > 1 ? 'а' : ''}`;
    } else {
      const days = Math.floor(milliseconds / this.msInDay);
      return `преди ${days}${days > 1 ? ' дни' : ' ден'}`;
    }
  }

  private adjustIntervalAccordingPastTime(passedTime: number) {
    let nextUpdateInMs = 1000;
    if (passedTime >= this.msInMin) nextUpdateInMs = this.msInMin;
    if (passedTime >= this.msInHour) nextUpdateInMs = this.msInHour;
    if (passedTime >= this.msInDay) nextUpdateInMs = this.msInDay;

    if (this.intervalId === undefined || this.lastInterval !== nextUpdateInMs) {
      this.lastInterval = nextUpdateInMs;
      this.updateTimer(nextUpdateInMs);
    }
  }

  private updateTimer(interval: number) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.currentTime.set(Date.now());
    }, interval);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
