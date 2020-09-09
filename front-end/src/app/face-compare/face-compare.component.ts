import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image.model';
import { forkJoin } from 'rxjs';

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
  targetImages: Image[] = [];
  imageURL: string;
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }
  getImages(): void {
    this.imageService.getImages().subscribe((response: any) => {
      this.isLoaded = true;
      response.images.forEach(image => this.images.push({prefix: 'faces', key: image, bucket: this.bucketName, data: null}));
    });
  }

  selectImage(imageName): void {
    this.sourceImage = imageName;
    this.imageService.getImage(imageName).subscribe((response: any) => {
      this.isLoaded = true;
      this.imageURL = 'data:image/png;base64,'+response.image;
    });
    // this.imageURL = `https://${this.bucketName}.s3.amazonaws.com/faces/${this.sourceImage}`;
  }

  analyzeImage(): void {
    const targetImageList = this.images.filter(img => img.key !== this.sourceImage);
    console.log(targetImageList);
    let calls = [];
    targetImageList.forEach(img => {
      calls.push(this.imageService.getImage(img.key))
    });
  
    forkJoin(...calls).subscribe(
      data => {
        data.forEach(ele => {
          this.targetImages.push({prefix: 'faces', key: null, bucket: this.bucketName, data: ele.image});
        });
      }, err => console.log('error ' + err),
      () => console.log('Got Template List: ' + JSON.stringify(this.targetImages))
    );
  }
}
