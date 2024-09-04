import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../album';
import { AlbumsService } from '../../../services/albums/albums.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css',
})
export class AlbumDetailsComponent {
  albumTitle!: string;
  album!: Album;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) {}

  getAlbum(title: string): void {
    this.album = this.albumsService.getAlbum(title);
  }

  ngOnInit(): void {
    this.albumTitle = this.route.snapshot.paramMap.get('title') || '';
    this.getAlbum(this.albumTitle);
  }
}
