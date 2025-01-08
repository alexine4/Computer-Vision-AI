import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { changeLoaderStatus } from '../shared/function/shared.function';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-videocamers',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './videocamers.component.html',
  styleUrl: './videocamers.component.scss',
})
export class VideocamersComponent {

  loading = true;
  camersForm!: FormGroup
  constructor(private router: Router) {}

  ngOnInit(): void {
    //preloader hide
    changeLoaderStatus().then((loading) => (this.loading = loading));

    this.camersForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'cameraType': new FormControl('', [Validators.required]),
      'location': new FormControl('', [Validators.required]),
    })
  }

  public openPage(url: string): void {
    this.router.navigateByUrl(url);
  }

  public addNewCamera() {
    console.log(this.camersForm.controls?.['name'].value);
    
    }
}
