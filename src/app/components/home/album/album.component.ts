import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../../album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  @Input() album!: Album;

  // albumData: Album = this.album

  @Output() emitAlbumData = new EventEmitter();

  showAlbumTracks(): void {
    this.emitAlbumData.emit(this.album);
  }
}
