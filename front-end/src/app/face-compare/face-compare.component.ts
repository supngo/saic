import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/Image.model';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


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
  imageBase64: string;
  scores: any = [];
  constructor(private spinner: NgxSpinnerService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }
  getImages(): void {
    this.isLoaded = false;
    this.spinner.show();
    this.imageService.getImages().subscribe((response: any) => {
      this.isLoaded = true;
      response.images.forEach(image => this.images.push({prefix: 'faces', key: image, bucket: this.bucketName, data: null}));
      this.spinner.hide();
    });
  }

  selectImage(imageName): void {
    this.spinner.show();
    this.isLoaded = false;
    this.targetImages = [];
    this.sourceImage = imageName;
    this.imageService.getImage(imageName).subscribe((response: any) => {
      this.isLoaded = true;
      this.imageBase64 = 'data:image/png;base64,'+response.image;
      this.spinner.hide();
    });
  }

  analyzeImage(): void {
    this.spinner.show();
    this.isLoaded = false;
    this.targetImages = [];
    const targetImageList = this.images.filter(img => img.key !== this.sourceImage);
    let calls = [];
    targetImageList.forEach(img => {
      calls.push(this.imageService.getImage(img.key))
    });
  
    forkJoin(...calls).subscribe(
      data => {
        data.forEach(ele => {
          this.targetImages.push({prefix: 'faces', key: null, bucket: this.bucketName, data: 'data:image/png;base64,'+ele.image});
        });
      }, err => console.log('error ' + err),
      () => {
        this.imageService.analyzeImages(
          this.imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
          this.targetImages.map(image => image.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')))
        .subscribe((analyzedImages: any) => {
          analyzedImages.forEach((element, index) => {
            this.targetImages[index].score = element.Score;
            this.targetImages[index].normalizedScore = element.NormalizedScore;
          });
          this.isLoaded = true;
          this.spinner.hide();
          // console.log(this.targetImages);
        })
      }
    );
  }
}
