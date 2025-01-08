import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { RecognitionLog } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecognitionLogService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public fetchAll(params?: { [key: string]: string | number | boolean }): Observable<RecognitionLog[]> {

    let httpParams = new HttpParams();
  
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    }
  }
    return this.httpClient.get<RecognitionLog[]>('/api/recognition/getAll', { params: httpParams });
  }

  public addNew(recognitionLog: RecognitionLog[] ): Observable<{message:string}>{
    return this.httpClient.post<{message:string}>('/api/recognition/addNew', recognitionLog)
  }

  public deleteByPeriod(params?: { [key: string]: string | number | boolean }): Observable<RecognitionLog[]> {

    let httpParams = new HttpParams();
  
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    }
  }
    return this.httpClient.get<RecognitionLog[]>('/api/recognition/getAll', { params: httpParams });
  }
}
