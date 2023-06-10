import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-line-width-picker',
  template: `
    <input type="range" class="line-width-picker" id="line-width" min="1" max="50" [defaultValue]="3" #width (input)="pickLineWidth(width.value)">
    <label for="line-width">Line Width {{ value }}</label>
  `,
  styles: [
  ]
})
export class LineWidthPickerComponent {

  value = "3";

  @Output() widthEvent = new EventEmitter<string>();

  pickLineWidth(value: string) {
    this.value = value;
    this.widthEvent.emit(value);
  }
}
