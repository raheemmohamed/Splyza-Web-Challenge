import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IAddReactionToVideoPayload,
  IUpdateExistingVideoPayload,
  IVideoReaction,
  IVideos,
} from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getAllVideos() {
    const getAllVideoAPI = environment.videoBoxBackendUrl + '/api/videos';
    return this.http.get<IVideos[]>(getAllVideoAPI);
  }

  getVideoDetailsById(videoId: any) {
    const getVideoDetailsByIdAPI =
      environment.videoBoxBackendUrl + '/api/videos/' + videoId;
    return this.http.get<IVideos>(getVideoDetailsByIdAPI);
  }

  getVideoReactionById(videoId: any) {
    const getVideoReactionByIdAPI = `${environment.videoBoxBackendUrl}/api/videos/${videoId}/reactions`;
    return this.http.get<IVideoReaction[]>(getVideoReactionByIdAPI);
  }

  updateExistingVideoDetailsById(
    payload: IUpdateExistingVideoPayload,
    videoId: any
  ) {
    const updateVideoDetailAPI = `${environment.videoBoxBackendUrl}/api/videos/${videoId}`;
    return this.http.patch(updateVideoDetailAPI, payload);
  }

  reactToExistingVideoById(payload: IAddReactionToVideoPayload) {
    const updateReactionToVideoByIdAPI = `${environment.videoBoxBackendUrl}/api/videos/${payload.videoId}/reactions`;
    return this.http.post(updateReactionToVideoByIdAPI, payload);
  }
}
