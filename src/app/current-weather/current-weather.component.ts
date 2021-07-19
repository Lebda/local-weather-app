import { Component, OnInit } from '@angular/core';
import { CurrentWeatherMaker, ICurrentWeather } from '../interfaces';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  public current: ICurrentWeather;

  public constructor() {
    this.current = CurrentWeatherMaker.Make();
  }

  ngOnInit(): void {}
}
