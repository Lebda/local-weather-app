import { Component, OnInit } from '@angular/core';
import { CurrentWeatherMaker, ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  public current: ICurrentWeather;

  public constructor(private readonly weatherService: WeatherService) {
    this.current = CurrentWeatherMaker.Make();
  }

  public ngOnInit(): void {
    this.weatherService
      .getCurrentWeather('Bethesda', 'US')
      .subscribe((data) => (this.current = data));
  }
}
