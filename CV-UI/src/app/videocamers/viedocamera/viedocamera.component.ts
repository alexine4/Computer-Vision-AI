import { Component, ElementRef, ViewChild } from '@angular/core';
import '@tensorflow/tfjs';
import { CommonModule } from '@angular/common';
import { VideoRecognitionService } from '../../shared/services/video-recognition.service';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { RecognitionLog } from '../../shared/interfaces';
import { RecognitionLogService } from '../../shared/services/recognition-log.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-viedocamera',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    TranslateModule,
    MatPaginatorModule,
  ],
  templateUrl: './viedocamera.component.html',
  styleUrl: './viedocamera.component.scss',
})
export class ViedocameraComponent {
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  pauseCheck = false;
  public playbackRate = 1.0;
  displayedColumns: string[] = ['position', 'object', 'percent', 'time'];
  dataSource!: RecognitionLog[];

  private intervalTime = 1000 * 10; // Інтервал у мілісекундах

  cameraId!: number;
  logs$!: Observable<RecognitionLog[] | null>;
  length = 200; // Загальна кількість елементів
  pageSize = 10; // Кількість елементів на сторінці
  pageIndex = 0; // Номер поточної сторінки
  queryParams = {
    cameraId: this.cameraId,
    offset: this.pageIndex * this.length,
    limit: this.length,
  };



  constructor(
    private toast: ToastrService,
    private videoRecognitionService: VideoRecognitionService,
    private recognitionLogService: RecognitionLogService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    // Завантаження моделі при ініціалізації
    await this.videoRecognitionService.loadModel();

    this.logs$ = this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.cameraId = params['id'];
          this.queryParams.cameraId = this.cameraId;

          return this.recognitionLogService.fetchAll(this.queryParams);
        }
        return of(null);
      })
    );

    this.fetchLogs()
    
  }

  private fetchLogs(): void{
     this.logs$.subscribe(
      (recognitionLog) => {
        if (recognitionLog !== null) {
          this.dataSource = recognitionLog;
        }
      },
      (error) => {
        this.toast.error(error.message);
      }
    );
  }

  async startDetection(): Promise<void> {
    const videoElement = this.video.nativeElement;
    const canvasElement = this.canvas.nativeElement;

    // Налаштування відео
    videoElement.src = '/testing_data/12.mp4'; // Вкажіть шлях до відео
    await videoElement.play();

    // Запуск розпізнавання
    await this.videoRecognitionService.detectObjects(
      videoElement,
      canvasElement,
      this.playbackRate,
      this.cameraId
    );
    const currentTime = Date.now();

    setInterval(() => {
      if (this.videoRecognitionService.detectionResults[0] !== undefined) {
        this.recognitionLogService
          .addNew(this.videoRecognitionService.detectionResults)
          .subscribe(
            (message) => {
              this.toast.show(message.message);
            },
            (error) => {
              this.toast.error(error.error.message);
            },
            () => {
              this.dataSource.concat(
                this.videoRecognitionService.detectionResults
              );
              this.videoRecognitionService.detectionResults = [];
            }
          );
      }
    }, this.intervalTime);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    // Викличте функцію для завантаження даних або оновлення інтерфейсу
  this.fetchLogs()
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
