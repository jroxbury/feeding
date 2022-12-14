import { Component } from '@angular/core';
import { EditButtonComponent } from './edit-button.component';
import { FeedingComponent } from './feeding.component';
import { ListComponent } from './list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ListComponent, FeedingComponent, EditButtonComponent],
})
export class AppComponent {}
