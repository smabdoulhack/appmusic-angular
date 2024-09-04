import { Injectable } from '@angular/core';
import { Album } from '../../album';
import albums from '../../../mock-albums';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albums: Album[] = albums;

  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbum(title: string): Album {
    return this.albums.filter(
      (album) => album.title.toLowerCase() === title.toLowerCase()
    )[0];
  }

  constructor() {}
}
