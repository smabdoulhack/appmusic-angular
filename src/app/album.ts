import { Track } from './track';

export interface Album {
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  label: string;
  trackCount: number;
  duration: string;
  tags: string[];
  tracks: Track[];
  coverImage?: string;
  description: string;
}