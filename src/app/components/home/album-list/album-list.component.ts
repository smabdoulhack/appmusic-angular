import { Component, Output } from '@angular/core';
import { AlbumsService } from '../../../services/albums/albums.service';
import { Album } from '../../../album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
})
export class AlbumListComponent {
  albums!: Album[];
  albumPlayingData: Album | null = null;
  keyword: string = '';
  isPlaying: boolean = false;

  pages!: Iterable<number>;

  constructor(private albumsService: AlbumsService) {}

  ngOnInit() {
    this.albums = this.albumsService.getAlbums();
    // this.pagination();
  }

  // pagination(): void {
  //   const pages = this.albums.length / 3;
  //   for (let index = 1; index <= this.pages.length; index++) {
  //     this.pages.push(index);
  //   }
  // }

  receivAlbumData(value: Album): void {
    this.albumPlayingData = value;
  }

  search(): void {
    if (this.keyword.trim() !== '') {
      this.albums = this.albumsService
        .getAlbums()
        .filter(
          (el) =>
            el.title.toLowerCase().includes(this.keyword.toLowerCase()) ||
            el.description.toLowerCase().includes(this.keyword.toLowerCase()) ||
            el.genre.toLowerCase().includes(this.keyword.toLowerCase()) ||
            el.label.toLowerCase().includes(this.keyword.toLowerCase()) ||
            el.artist.toLowerCase().includes(this.keyword.toLowerCase())
        );
    } else {
      this.albums = this.albumsService.getAlbums();
    }
  }

  receivPlaySignal(value: boolean): void {
    this.isPlaying = value;
  }

  // play = async () => {
  //   let totalstep = 0;
  //   for (const track of trackList) {
  //     currentTrackData.value.title = track.title;

  //     console.log('title', currentTrackData.value.title);

  //     currentTrackData.value.number++;

  //     const totalstep = (track.trackDuration * 100) / totalDuration.value;

  //     console.log('totalstep', totalstep);

  //     const step = totalstep / track.trackDuration;

  //     console.log('step', step);

  //     const interval = track.trackDuration * 1000; // Interval en millisecondes (1 seconde)

  //     console.log('interval', interval);

  //     // Attendre chaque intervalle
  //     const current = await new Promise((resolve) => {
  //       const intervalId = setInterval(() => {
  //         progress.value += step;
  //         if (progress.value >= 1) {
  //           clearInterval(intervalId);
  //           resolve();
  //         }
  //       }, interval);
  //     });
  //   }
  //   emit('stopPlay', false);
  // };
}
