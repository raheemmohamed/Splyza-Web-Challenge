import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import {
  IAddReactionToVideoPayload,
  IVideoReaction,
} from 'src/app/interfaces/video.interface';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.scss'],
})
export class DetailVideoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videoDetails!: any;
  videoReactionList!: IVideoReaction[];

  loggedInUserDetails: IUser | null = null;
  videoTitle!: string;

  videoTitleUpdated: boolean = false;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onChangeActiveParamChange();
  }

  getActiveLoggedUserDetails() {
    this.loggedInUserDetails = this.userService.getActiveLoggedUser();

    console.log('loggedinUser', this.loggedInUserDetails);
  }

  onChangeActiveParamChange() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('videoId');

      this.getVideoDetailById(videoId);
      this.getVideoReactions(videoId);
      this.getActiveLoggedUserDetails();
    });
  }

  getVideoDetailById(videoId: any) {
    this.subscriptions.push(
      this.videoService.getVideoDetailsById(videoId).subscribe({
        next: (videoDetail: any) => {
          console.log('Success', videoDetail);
          this.videoDetails = videoDetail;
          this.videoTitle = videoDetail.title;
        },
        error: (error) => {
          console.error('Get indetail video api failed', error);
        },
      })
    );
  }

  getVideoReactions(videoId: any) {
    this.subscriptions.push(
      this.videoService.getVideoReactionById(videoId).subscribe({
        next: (reactionList) => {
          console.log('reactionList', reactionList);
          this.videoReactionList = reactionList.reverse();
        },
        error: (error) => {
          console.error('Video Reaction API Got Failed', error);
        },
      })
    );
  }

  updateVideoTitle(videoId: any) {
    const payload = {
      title: this.videoTitle,
    };

    this.subscriptions.push(
      this.videoService
        .updateExistingVideoDetailsById(payload, videoId)
        .subscribe({
          next: (res) => {
            console.log('Video Title updated successfully', res);
            this.videoTitleUpdated = true;
          },
        })
    );
  }

  videoSaveReaction(eventType: 'star' | 'snapshot') {
    console.log(
      'Video save Reaction',
      this.videoPlayer.nativeElement.currentTime
    );

    const payload: IAddReactionToVideoPayload = {
      videoId: this.videoDetails.id,
      type: eventType,
      timeframe: this.videoPlayer.nativeElement.currentTime,
    };

    if (eventType == 'snapshot') {
      payload.dataUri = this.videoDetails.previewUrl;
    }

    this.subscriptions.push(
      this.videoService.reactToExistingVideoById(payload).subscribe({
        next: (reactionRes) => {
          console.log('Reaction save success', reactionRes);
          this.getVideoReactions(this.videoDetails.id);
        },
        error: (error) => {
          console.error('Video Reaction API Failed', error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
