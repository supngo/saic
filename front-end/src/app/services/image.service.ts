import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}
  bucketName: string =  'thombasin';
  getImages() {
    return this.http.get(`${environment.apiUrl}images`)
  }
  getImage(key) {
    return this.http.get(`${environment.apiUrl}image?key=${key}`)
  }
}
