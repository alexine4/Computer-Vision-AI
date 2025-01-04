import { Injectable } from '@angular/core';
import * as tmImage from '@teachablemachine/image';

@Injectable({
  providedIn: 'root'
})
export class TeachableMachineService {

  constructor() { }


  private model: any;
  private webcam: any;
  private maxPredictions: number = 0;
  private video!: HTMLVideoElement;

  private readonly modelURL = './my_model/model.json';
  private readonly metadataURL = './my_model/metadata.json';

  async init(): Promise<void> {
    // Load the model and metadata
    this.model = await tmImage.load(this.modelURL, this.metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
  }

  async setupWebcam(canvasElement: HTMLCanvasElement): Promise<void> {
    this.webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
    await this.webcam.setup();
    await this.webcam.play();
    canvasElement.appendChild(this.webcam.canvas);
    this.webcam.update();
  }

   // Set up the video file to display and process
   async setupVideoFile(file: File, videoContainer: HTMLElement, canvasElement: HTMLCanvasElement): Promise<void> {
    // Create a video element
    const video = document.createElement('video');
    video.src = '/testing_data/test-video.mp4' //URL.createObjectURL(file); // Create URL for the file
    video.autoplay = true;
    video.loop = true;
    video.controls = true; // Add video controls for playback
    video.width = canvasElement.width; // Match canvas dimensions
    video.height = canvasElement.height;
  
    // Append the video element to the specified container
    videoContainer.appendChild(video);
  
    // Wait for the video to load
    await new Promise<void>((resolve) => {
      video.onloadeddata = () => {
        console.log('Video loaded successfully.');
        resolve();
      };
    });
  
    // Start processing video frames
    this.processVideoFrames(video, canvasElement);
  
  
    this.video = video; // Set the video element for later processing
  }

  // Run the prediction on the current video frame
  async predict(): Promise<{ className: string; probability: number }[]> {
    if (!this.video) {
      throw new Error("Video is not loaded or set.");
    }

    // Make predictions on the video frame
    const predictions = await this.model.predict(this.video);
    return predictions.map((pred: { className: string, probability: number }) => ({
      className: pred.className,
      probability: pred.probability
    }));
  }

  // Update the video frame for continuous prediction
  updateVideoFrame(): void {
    if (this.video) {
      this.video.play();
    }
  }
  private async processVideoFrames(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<void> {
    const context = canvas.getContext('2d');
  
    const processFrame = async () => {
      if (video.paused || video.ended) {
        return;
      }
  
      
  
      // Perform predictions on the canvas frame
     // await this.predict(canvas);
  
      // Continue processing the next frame
      requestAnimationFrame(processFrame);
    };
  
    // Start processing frames
    requestAnimationFrame(processFrame);
  }
  
}
