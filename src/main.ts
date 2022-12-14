import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { FeedingViewComponent } from './app/feeding/feeding-view.component';
import { DiapersComponent } from './app/diapers/diapers.component';

const routes: Routes = [
  {
    path: '',
    component: FeedingViewComponent,
  },
  {
    path: 'diapers',
    component: DiapersComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
