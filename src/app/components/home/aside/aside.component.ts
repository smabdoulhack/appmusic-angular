import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../../album';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  @Input() albumPlayingData!: Album;
  @Output() emitPlaySignal = new EventEmitter();

  ngOnInit() {
    console.log(this.albumPlayingData);
  }

  play(): void {
    this.emitPlaySignal.emit(true);
  }
}
