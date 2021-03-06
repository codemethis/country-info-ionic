import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';

import { CountryService } from '../services/country.service';

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	DetailPage
  ],
  imports: [
	BrowserModule,
	HttpModule,
	IonicModule.forRoot(MyApp),
	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyCablXaoDJoDyVE5fHbqZHJ0PZLgEmgP-o'
	})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	{provide: ErrorHandler, useClass: IonicErrorHandler},
	CountryService
  ]
})
export class AppModule {}
