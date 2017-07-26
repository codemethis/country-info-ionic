import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Country } from '../classes/country';

@Injectable()
export class CountryService {

  private apiUrl = 'https://restcountries.eu/rest/v1/';

  constructor(private http: Http) {

  }

  getCountryByAlphaCode(code: string): Observable<Country> {
    if (code === undefined) {
      console.log('Search called with undefined search string');
      return Observable.empty();
    }
    if (code.length === 0) {
      return Observable.empty();
    }
    return this.http.get(`${this.apiUrl}alpha/${code}`)
      .map(this.getSingleCountry)
      .catch(this.getNullObs);
  }

  getCountriesByName(input: string): Observable<Country[]> {
    if (input === undefined) {
      console.log('Search called with undefined search string');
      return Observable.of([]);
    }
    if (input.length === 0) {
      return Observable.of([]);
    }
    return this.http.get(`${this.apiUrl}name/${input}`)
      .map(this.getCountryArray)
      .catch(this.handleError);
  }

  getCountriesFromCodeArray(codes: string[]): Observable<Country[]> {
      return this.http.get(`${this.apiUrl}alpha?codes=${codes.join(';')}`)
      .map(this.getCountryArray)
      .catch(this.handleError);
  }

  getFlagPath(c: Country): string {
	  return `assets/Flags/${c.alpha2Code.toLowerCase()}.png`;
  }

  private getSingleCountry(res: Response) {
    let body = res.json();
    return body;
  }

  private getCountryArray(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }

    // console.error(errMsg);
    return Observable.of([]);
  }

  private getNullObs(error: Response | any) {
    return Observable.of(null);
  }
}
