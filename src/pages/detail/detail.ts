import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Country } from '../../classes/country';
import { WorldLanguage, worldLanguages } from '../../classes/world-languages';
import { CountryService } from '../../services/country.service';

@Component({
	selector: 'detail-page',
	templateUrl: './detail.html'
})
export class DetailPage {
	country: Country;
	filteredLanguages: WorldLanguage[];
	borders: Country[];

	constructor(
		private navCtrl: NavController,
		navParams: NavParams,
		protected countryService: CountryService
	) {
		this.country = navParams.get('country');
		this.filteredLanguages = this.getFilteredLanguages();
		this.getBorders();
	}

	getFilteredLanguages(): WorldLanguage[] {
		return worldLanguages.filter(lang => this.country.translations[lang.code]);
	}

	getLanguageFromCode(code: string): string {
		const lang = worldLanguages.find(l => l.code === code);

		return lang ? lang.name : '';
	}

	getBorders(): void {
		if(this.country.borders.length === 0) {
			return;
		}
		this.countryService.getCountriesFromCodeArray(this.country.borders)
			.subscribe(o => this.borders = o);
	}

	goToNewDetail(c: Country) {
		this.navCtrl.push(DetailPage, {country: c});
	}

	getZoom(): number {
		let z = this.country.area || 770000;
		z = Math.pow(z, -0.077) * 15;
		z = Math.round(z);

		return z;
	}
}
