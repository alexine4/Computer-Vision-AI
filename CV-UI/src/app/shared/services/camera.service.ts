import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {   }


  public addNew(recognitionLog: RecognitionLog[] ): Observable<{message:string}>{
      return this.httpClient.post<{message:string}>('/api/recognition/addNew', recognitionLog)
    }
  
}
