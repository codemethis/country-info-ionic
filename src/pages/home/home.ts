import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';

import { Country } from '../../classes/country';
import { CountryService } from '../../services/country.service';
import { DetailPage } from '../detail/detail';

import '../../global-imports/rxjs-imports';

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {
	searchResults: Country[];
	private searchStream = new Subject<string>();

	constructor(
		public navCtrl: NavController,
		protected countryService: CountryService
	) {
		this.searchStream.debounceTime(500)
			.distinctUntilChanged()
			.switchMap((s: string) => this.countryService.getCountriesByName(s))
			.subscribe(o => this.searchResults = o);
	}

	goToDetail(c: Country) {
		this.navCtrl.push(DetailPage, {country: c});
	}

	runSearch(term: string) {
		this.searchStream.next(term);
	}

	trackByAlpha2Code(index: number, c: Country) {
		return c.alpha2Code;
	}

}
