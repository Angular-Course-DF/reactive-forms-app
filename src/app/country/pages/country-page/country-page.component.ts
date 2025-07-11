import { CountryService } from './../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  //los efectos se ejecutan una vez que el componente se ha inicializado o es montado
  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    /*
     * En este caso, se limpian las suscripciones de región y país.
     * Se usa onCleanup para limpiar las suscripciones cuando el componente se destruye.
     * Esto es útil para evitar problemas de memoria y evitar que se acumulen suscripciones.
     */
    onCleanup(() => {
      regionSubscription!.unsubscribe();
      countrySubscription!.unsubscribe();
      console.log('limpio suscripción de región al salir del componente');
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')
      ?.valueChanges.pipe(tap(() => this.myForm.get('country')!.setValue('')))
      .pipe(
        /*
         * Cuando se cambia la región, se limpia el campo de país y el campo de frontera.
         * Los borders y countriesByRegion también se limpian.
         */
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        /*
         *  Cuando se cambia la región, se obtienen los países de esa región.
         *  Se usa el operador switchMap para cancelar la suscripción anterior y
         *  obtener los nuevos países de la región seleccionada.
         *  Esto es útil para evitar problemas de memoria y evitar que se acumulen suscripciones
         */
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )

      .subscribe((countries) => {
        console.log({ countries });
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        // que solo pase valores que no sean nulos o indefinidos
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? '')
        ),
        switchMap((country) =>
          // Cuando se selecciona un país, se obtienen las fronteras de ese país.
          // this.borders.set([]);
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        console.log(borders);
        this.borders.set(borders);
      });
  }
}
