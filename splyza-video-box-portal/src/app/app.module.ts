import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { VideosListComponent } from './layouts/videos-list/videos-list.component';
import { DetailVideoComponent } from './layouts/detail-video/detail-video.component';
import { PrimeModule } from './prime/prime.module';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideosListComponent,
    DetailVideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
