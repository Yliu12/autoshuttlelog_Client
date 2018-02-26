import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LogentryComponent } from './logentry/logentry.component';
import { ShuttleinfoComponent } from './shuttleinfo/shuttleinfo.component';

import {HttpClientModule} from '@angular/common/http';

import {AppGlobals} from './service/app.global';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogentryComponent,
    ShuttleinfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule
  ],
  providers: [AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule {

}

