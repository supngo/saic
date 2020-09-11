import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { FaceCompareComponent } from './face-compare/face-compare.component';
import { AppComponent } from './app.component';



// const routes: Routes = [];
const routes: Routes = [
  { path: '', component: FaceCompareComponent },
  // { path: 'main', component: AppComponent },
  { path: 'face', component: FaceCompareComponent },
  { path: 'image', component: ImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
