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
import {DriverComponent} from './driver/driver.component';
import {ManagerComponent} from './manager/manager.component';
import './rxjs-operators';
import {LoopStopComponent} from './driver/shuttleinfo/loop-stop/loop-stop.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'manager', component: ManagerComponent}


  // {path: 'manager', component: }

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogentryComponent,
    ShuttleinfoComponent,
    DriverComponent,
    ManagerComponent,
    LoopStopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule {


}

