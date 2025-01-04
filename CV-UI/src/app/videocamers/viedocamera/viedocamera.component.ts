import { Component, ElementRef, ViewChild } from '@angular/core';
import '@tensorflow/tfjs';
import { CommonModule } from '@angular/common';
import { VideoRecognitionService } from '../../shared/services/video-recognition.service';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
];

@Component({
  selector: 'app-viedocamera',
  imports: [CommonModule, MatIconModule, MatTableModule, TranslateModule],
  templateUrl: './viedocamera.component.html',
  styleUrl: './viedocamera.component.scss',
})
export class ViedocameraComponent {
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  pauseCheck = false;
  public playbackRate = 1.0;
  displayedColumns: string[] = ['position', 'object', 'percent', 'time'];
  dataSource = ELEMENT_DATA;

  constructor(private videoRecognitionService: VideoRecognitionService) {}

  async ngOnInit(): Promise<void> {
    // Завантаження моделі при ініціалізації
    await this.videoRecognitionService.loadModel();
  }

  async startDetection(): Promise<void> {
    const videoElement = this.video.nativeElement;
    const canvasElement = this.canvas.nativeElement;

    // Налаштування відео
    videoElement.src = '/testing_data/test-video.mp4'; // Вкажіть шлях до відео
    await videoElement.play();

    // Запуск розпізнавання
    await this.videoRecognitionService.detectObjects(
      videoElement,
      canvasElement,
      this.playbackRate
    );
  }

  public pauseResume(): void {
    if (this.pauseCheck) {
      this.pauseCheck = false;
      this.resume();
    } else {
      this.pauseCheck = true;
      this.pause();
    }
  }
  private pause(): void {
    this.pauseCheck = true;
    this.videoRecognitionService.pause();
  }

  private resume(): void {
    this.pauseCheck = false;
    this.videoRecognitionService.resume();
  }

  stop(): void {
    this.videoRecognitionService.stop();
  }

  seek(seconds: number): void {
    const videoElement = this.video.nativeElement;
    this.videoRecognitionService.seek(videoElement, seconds);
  }

  changeSpeed(speed: number): void {
    this.videoRecognitionService.setPlaybackSpeed(speed);
  }
}
