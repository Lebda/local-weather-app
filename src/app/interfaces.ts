export interface ICurrentWeather {
  city: string;
  country: string;
  date: Date;
  image: string;
  temperature: number;
  description: string;
}

export class CurrentWeatherMaker {
  private constructor() {}
  public static Make(): ICurrentWeather {
    const data: ICurrentWeather = {
      city: 'Bethesda',
      country: 'US',
      date: new Date(),

      image: 'assets/img/sunny.svg',
      temperature: 72,

      description: 'sunny',
    };
    return data;
  }
}
