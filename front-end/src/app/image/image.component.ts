import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  image;
  data: string | ArrayBuffer;
  isLoaded = false;
  message: string;
  name: string;
  contentType: string;
  constructor(private spinner: NgxSpinnerService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.message = '';
  }

  submit(): void {
    this.isLoaded = false;
    this.spinner.show();
    this.imageService.uploadImage(this.data, this.image.name).subscribe((response: any) => {
      this.isLoaded = true;
      this.message = `Template ${this.image.name} uploaded successfully`;
      this.spinner.hide();
    },
    err => {
      this.message = `Error! Template ${this.image.name} uploaded unsuccessfully`;
      this.spinner.hide();
    }
    );
  }

  onChange(event) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.spinner.hide();
      this.data = reader.result;
    };
  }
}
