import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}
  getImages() {
    return this.http.get(`${environment.apiUrl}images`)
  }

  getImage(key: string) {
    return this.http.get(`${environment.apiUrl}image?key=${key}`)
  }

  createTemplate(key: string, imageData: string) {
    return this.http.post(`${environment.apiUrl}create-template`, {imageData: imageData, key: key})
  }
  
  analyzeImages(singleTemplate: string, templateList: string []) {
    return this.http.post(`${environment.apiUrl}compare-list`, {SingleTemplate: singleTemplate, TemplateList: templateList })
  }
}
