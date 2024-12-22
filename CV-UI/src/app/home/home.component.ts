import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { changeLoaderStatus } from '../shared/function/shared.function';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    //preloader hide
    changeLoaderStatus().then(loading => this.loading = loading);
  }
}
