import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CurrentWeatherMaker, ICurrentWeather } from '../interfaces';

interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public readonly currentWeather$: BehaviorSubject<ICurrentWeather>;

  public constructor(private readonly httpClient: HttpClient) {
    this.currentWeather$ = new BehaviorSubject<ICurrentWeather>(
      CurrentWeatherMaker.Make()
    );
  }

  public updateCurrentWeather(search: string | number, country?: string): void {
    this.getCurrentWeather(search, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    );
  }

  public getCurrentWeather(
    cityOrZip: string | number,
    country?: string
  ): Observable<ICurrentWeather> {
    let uriParams = new HttpParams();
    if (typeof cityOrZip === 'string') {
      uriParams = uriParams.set(
        'q',
        country ? `${cityOrZip},${country}` : cityOrZip
      );
    } else {
      uriParams = uriParams.set('zip', 'search');
    }

    return this.getCurrentWeatherHelper(uriParams);
  }

  // getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
  //   const uriParams = new HttpParams()
  //     .set('lat', coords.latitude.toString())
  //     .set('lon', coords.longitude.toString());

  //   return this.getCurrentWeatherHelper(uriParams);
  // }

  public getCurrentWeatherOld(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId);
    const rawData = this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
      { params: uriParams }
    );
    return rawData.pipe(map((data) => this.transformToICurrentWeather(data)));
  }

  private getCurrentWeatherHelper(
    uriParams: HttpParams
  ): Observable<ICurrentWeather> {
    uriParams = uriParams.set('appid', environment.appId);
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)));
  }

  private transformToICurrentWeather(
    data: ICurrentWeatherData
  ): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    };
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }
}
