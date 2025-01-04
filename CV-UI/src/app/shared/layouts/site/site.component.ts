import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-site',
  imports: [HeaderComponent, AppComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss',
})
export class SiteComponent {}
