import { IUser } from './user.interface';

export interface IVideos {
  id: string;
  title: string;
  createdDate: string; // iso date string
  author: IUser;
  previewUrl: string;
}

export interface IVideoReaction {
  id: string;
  video: IVideos;
  author: IUser;
  type: 'star' | 'snapshot';
  postedDate?: string; // iso date string
  timeframe: number;
  createdDate?: string;
  imageUrl?: string;
}

export interface IAddReactionToVideoPayload {
  videoId: string;
  type: 'star' | 'snapshot';
  timeframe: any;
  dataUri?: string;
}

export interface IUpdateExistingVideoPayload {
  title?: string;
  description?: string;
}
