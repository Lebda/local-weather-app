import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, defaultIfEmpty } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface IPostalCode {
  countryCode: string;
  postalCode: string;
  placeName: string;
  lng: number;
  lat: number;
}

export class PostalCodeMaker {
  private constructor() {}

  public static Make(): IPostalCode {
    const data: IPostalCode = {
      countryCode: 'US',
      postalCode: '',
      placeName: '',
      lng: 0,
      lat: 0,
    };
    return data;
  }
}

export interface IPostalCodeData {
  postalCodes: [IPostalCode];
}

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>;
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  public constructor(private httpClient: HttpClient) {}

  public resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalcode', postalCode);

    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(PostalCodeMaker.Make())
      );
  }
}
