import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  public current$: Observable<ICurrentWeather>;
  private currentWeatherSubscription = new Array<Subscription>();

  public constructor(private readonly weatherService: WeatherService) {
    this.current$ = this.weatherService.currentWeather$;
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  public getOrdinal(date: Date | undefined): string {
    if (!date) {
      return '';
    }
    const n = date.getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }
}
