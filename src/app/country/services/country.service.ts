import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  //por si se hace alguna modificación, se haría sobre ese getter y no en el array
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    console.log(region);
    const url = `${this.apiUrl}/all?fields=name,cca3,borders`;
    return this.http.get<Country[]>(`${url}/region/${region}`);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;
    return this.http.get<Country>(`${url}`);
  }

  getCountryNamesByCodeArray(counrtyCodes: string[]): Observable<Country[]> {
    if (!counrtyCodes || counrtyCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    counrtyCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);

      countriesRequests.push(request);
    });

    // combineLatest espera a que todos los observables se completen
    // y devuelve un array con los resultados de cada uno de ellos
    // Si alguno de los observables falla, el observable combinado fallará también
    return combineLatest(countriesRequests);
  }
}
