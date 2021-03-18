import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  public searchWord(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http
      .get(
        url +
          query +
          '.json?types=address&access_token=' +
          environment.mapbox.accessToken
      )
      .pipe(
        map((res: MapboxOutput) => {
          return res.features;
        })
      );
  }

  public getAddress(long, lat) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http
      .get(
        url +
          long +
          ',' +
          lat +
          '.json?access_token=' +
          environment.mapbox.accessToken
      )
      .pipe(
        map((res: MapboxOutput) => {
          return res.features;
        })
      );
  }
}
