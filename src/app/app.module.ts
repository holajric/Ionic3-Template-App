//Core plugins
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Third-party plugins
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Local plugins
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { Config } from './env.constants';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    IonicModule.forRoot(AppComponent),
    AngularFireModule.initializeApp(Config.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }
    )
  ],
  declarations: [ AppComponent ],
  bootstrap: [ IonicApp ],
  exports: [ 
    AppComponent 
  ],
  entryComponents: [ 
    AppComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
