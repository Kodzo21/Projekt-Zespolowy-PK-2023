import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <input type="color" class="color-picker" #color (change)="pickColor(color.value)">
  `,
  styles: [
  ]
})
export class ColorPickerComponent {
  @Output() colorEvent = new EventEmitter<string>();

  pickColor(value: string) {
    this.colorEvent.emit(value);
  }
}
