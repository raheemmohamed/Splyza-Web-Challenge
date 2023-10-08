import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListComponent } from './layouts/videos-list/videos-list.component';
import { DetailVideoComponent } from './layouts/detail-video/detail-video.component';

const routes: Routes = [
  { path: '', redirectTo: 'video', pathMatch: 'full' },
  { path: 'video', component: VideosListComponent },
  { path: 'detail-video/:videoId', component: DetailVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
