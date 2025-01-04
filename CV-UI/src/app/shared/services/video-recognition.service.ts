import { Injectable, model } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tmImage from '@teachablemachine/image';
import '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class VideoRecognitionService {
  private model: cocoSsd.ObjectDetection | null = null;
  private teachableModel: any = null;
  private teachableMaxPredictions = 0;
  private readonly teachableModelURL = '/my_model/model.json';
  private readonly teachableMetadataURL = '/my_model/metadata.json';
  private text!: string;
  private color!: string;
  private isPaused = false;
  private shouldStop = false;
  private playbackSpeed = 1;

  constructor() {}

  // Завантаження моделі
  async loadModel(): Promise<void> {
    // Завантаження моделі Coco SSD
    try {
      this.model = await cocoSsd.load();
      console.log('Coco SSD model loaded');
    } catch (error) {
      console.error('Error loading Coco SSD model:', error);
    }

    // Завантаження моделі Teachable Machine, якщо URL задані
    if (this.teachableModelURL && this.teachableMetadataURL) {
      try {
        this.teachableModel = await tmImage.load(
          this.teachableModelURL,
          this.teachableMetadataURL
        );
        console.log('TeachMod model loaded successfully!');
      } catch (error) {
        console.error('Error loading Teachable Machine model:', error);
      }
      this.teachableMaxPredictions = this.teachableModel.getTotalClasses();
    }
  }

  // Розпізнавання об'єктів на кадрі відео
  async detectObjects(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    playbackRate: number
  ): Promise<void> {
    if (!this.model) {
      throw new Error('Coco SSD model not loaded.');
    }

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Cannot get canvas context.');
    }

    let playbackSpeed = playbackRate;

    const detectFrame = async () => {
      if (this.shouldStop || this.isPaused) return;

      // Синхронізація розмірів

      const scaleX = canvas.width / video.videoWidth;
      const scaleY = (canvas.height / video.videoHeight)

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.playbackRate = playbackSpeed
      // Відобразити рамки навколо розпізнаних об'єктів
      const predictions = await this.model!.detect(video);
      predictions
        .filter((p) => p.class === 'person') 
        .forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;

          // Додаткове розпізнавання за допомогою Teachable Machine
          if (this.teachableModel) {
            this.teachableModel.predict(video).then((prediction: any[]) => {
              prediction.forEach((prediction: any, index: number) => {
                // Виконати розпізнавання
                if (prediction.probability > 0.5) {
                  switch (prediction.className) {
                    case 'Worker':
                      this.color = 'green';
                      break;
                    case 'Ambulancer':
                      this.color = 'yellow';
                      break;
                    case 'Policer':
                      this.color = 'blue';
                      break;
                    case 'Solder':
                      this.color = 'red';
                      break;
                    case 'Fireforcer':
                      this.color = 'red';
                      break;

                    default:
                      this.color = 'white';
                      break;
                  }
                  this.text = `${prediction.className} (${(
                    prediction.probability * 100
                  ).toFixed(1)}%)`;
                }
              });
            });
          }
          // Малюємо рамку
          context.strokeStyle = this.color;
          context.lineWidth = 2;
          context.strokeRect(
            x * scaleX,
            y * scaleY,
            width * scaleX,
            height * scaleY
          );
          // Малюємо текст
          context.fillStyle = this.color;
          context.font = '16px Arial';
          context.fillText(
            this.text,
            x * scaleX,
            y > 10 ? (y - 5) * scaleY : (y + 15) * scaleY
          );
        });

      requestAnimationFrame(detectFrame);
    };

    detectFrame();
    
  }
  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
    this.detectObjects
  }

  stop(): void {
    this.shouldStop = true;
  }

  seek(video: HTMLVideoElement, timeInSeconds: number): void {
    video.currentTime = timeInSeconds;
  }

  setPlaybackSpeed(speed: number): void {
    this.playbackSpeed = speed;
  }
}



