import { Component, OnDestroy, OnInit } from '@angular/core';
import { IVideos } from '../../../app/interfaces/video.interface';
import { VideoService } from '../../../app/services/video.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
})
export class VideosListComponent implements OnInit, OnDestroy {
  viewSwitch = [
    {
      view: 'grid',
      icon: 'pi-microsoft',
      active: true,
    },
    {
      view: 'list',
      icon: 'pi-list',
      active: false,
    },
  ];

  activeViewMode!: any;

  allVideoList: IVideos[] = [];

  subscriptions: Subscription[] = [];

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.getActiveView();

    this.getAllVideos();
  }

  getAllVideos() {
    this.subscriptions.push(
      this.videoService.getAllVideos().subscribe({
        next: (videoList) => {
          console.log('video List', videoList);
          this.allVideoList = videoList;
        },
        error: (error) => {
          console.error('Get All Video list API failed', error);
        },
      })
    );
  }

  onChangeView(i: number) {
    this.viewSwitch.forEach((res: any, index) =>
      index == i ? (res.active = true) : (res.active = false)
    );
    this.getActiveView();
  }

  getActiveView() {
    this.activeViewMode = this.viewSwitch.find(
      (viewModeList) => viewModeList.active
    );

    return this.activeViewMode;
  }

  openVideoDetailPage(videoId: any) {
    this.router.navigate(['/detail-video', videoId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
