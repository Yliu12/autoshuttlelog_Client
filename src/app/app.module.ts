import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';
import {NavbarComponent} from './driver/navbar/navbar.component';
import {LoginComponent} from './driver/login/login.component';
import {environment} from '../environments/environment';
import {LogentryComponent} from './driver/logentry/logentry.component';
import {ShuttleinfoComponent} from './driver/shuttleinfo/shuttleinfo.component';


import {AppGlobals} from './driver/service/app.global';
import { DriverComponent } from './driver/driver.component';


const appRoutes: Routes = [
  {path: '', component: AppComponent}
  // {path: 'manager', component: }

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogentryComponent,
    ShuttleinfoComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule {

}

