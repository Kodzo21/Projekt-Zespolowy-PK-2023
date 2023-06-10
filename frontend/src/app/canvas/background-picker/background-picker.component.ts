import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-background-picker',
  template: `
    <input type="file" class="background-picker" accept="image/svg+xml" #file (change)="pickImage($event)">
  `,
  styles: [
  ]
})
export class BackgroundPickerComponent {
  @Output() imageEvent = new EventEmitter<Event>();

  pickImage(value: Event) {
    this.imageEvent.emit(value);
  }
}
