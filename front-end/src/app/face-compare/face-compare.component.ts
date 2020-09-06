import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image.model';

@Component({
  selector: 'app-face-compare',
  templateUrl: './face-compare.component.html',
  styleUrls: ['./face-compare.component.css']
})
export class FaceCompareComponent implements OnInit {
  isLoaded = false;
  images: Image[] = [];
  bucketName: string =  'thombasin';
  sourceImage: string;
  imageURL: string;
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }
  getImages(): void {
    this.imageService.getImages().subscribe((response: any) => {
      this.isLoaded = true;
      response.images.forEach(image => this.images.push({prefix: 'faces', key: image, bucket: this.bucketName}));
    });
  }

  selectImage(imageName): void {
    console.log(imageName);
    this.sourceImage = imageName;
    this.imageURL = `https://${this.bucketName}.s3.amazonaws.com/faces/${this.sourceImage}`;
  }
}
