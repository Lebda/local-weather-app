import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather/weather.service';
import { BehaviorSubject, of } from 'rxjs';
import { CurrentWeatherMaker, ICurrentWeather } from '../interfaces';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  // let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    // const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
    //   'getCurrentWeather',
    // ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            currentWeather$: new BehaviorSubject<ICurrentWeather>(
              CurrentWeatherMaker.Make()
            ),
          },
        },
      ],
      declarations: [CurrentWeatherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    // weatherServiceMock = TestBed.inject(WeatherService) as any;
  });

  it('should create', () => {
    // Arrange
    //weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // Act
    fixture.detectChanges(); // triggers ngOnInit
    // Assert
    expect(component).toBeTruthy();
  });

  // it('should get currentWeather from weatherService', () => {
  //   // Arrange
  //   weatherServiceMock.getCurrentWeather.and.returnValue(of());

  //   // Act
  //   fixture.detectChanges(); // triggers ngOnInit()

  //   // Assert
  //   expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  // });

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Arrange
    //weatherServiceMock.currentWeather$.next(CurrentWeatherMaker.Make());

    // Act
    fixture.detectChanges(); // triggers ngOnInit()

    // Assert
    expect(component.current$).toBeDefined();
    expectAsync(component.current$.toPromise()).toBeResolvedTo(
      CurrentWeatherMaker.Make()
    );

    // Assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl.query(
      By.css('.mat-title')
    ).nativeElement;
    expect(titleEl.textContent).toContain('Bethesda');
  });
});
