import { Component, Input } from '@angular/core';
import { Album } from '../../../album';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  @Input() albumPlayingData: Album | null = null;
  @Input() isPlaying!: boolean;
}
