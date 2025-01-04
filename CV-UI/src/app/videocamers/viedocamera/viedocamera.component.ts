import { Component, ElementRef, ViewChild } from '@angular/core';
import '@tensorflow/tfjs';
import { CommonModule } from '@angular/common';
import { VideoRecognitionService } from '../../shared/services/video-recognition.service';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { RecognitionLog } from '../../shared/interfaces';
import { RecognitionLogService } from '../../shared/services/recognition-log.service';

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
  dataSource!: RecognitionLog[] ;

  constructor(
    private videoRecognitionService: VideoRecognitionService,
    private recognitionLogService: RecognitionLogService
  ) {}

  async ngOnInit(): Promise<void> {
    // Завантаження моделі при ініціалізації
    await this.videoRecognitionService.loadModel();
    const params = {
      cameraId: 1,
      offset: 2,
      limit:3
    }
    this.recognitionLogService.fetchAll(params).subscribe((recognitionLog) => {
      this.dataSource = recognitionLog;
      console.log(this.dataSource);
      
    });
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
