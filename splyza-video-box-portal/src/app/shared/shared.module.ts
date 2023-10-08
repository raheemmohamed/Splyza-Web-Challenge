import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVideoComponent } from './list-video/list-video.component';
import { GridVideoComponent } from './grid-video/grid-video.component';

@NgModule({
  declarations: [ListVideoComponent, GridVideoComponent],
  imports: [CommonModule],
  exports: [ListVideoComponent, GridVideoComponent],
})
export class SharedModule {}
