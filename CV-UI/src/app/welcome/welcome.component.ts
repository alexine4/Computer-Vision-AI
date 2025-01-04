import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { changeLoaderStatus } from '../shared/function/shared.function';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit{
  loading = true
  ngOnInit(): void {
    changeLoaderStatus().then(loading => this.loading = loading);
  }
}
