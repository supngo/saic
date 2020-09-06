import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}
  bucketName: string =  'thombasin';
  getImages() {
    return this.http.get('http://localhost:3000/dev/images')
  }
}
