import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
