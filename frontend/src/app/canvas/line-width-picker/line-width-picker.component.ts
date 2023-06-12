import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-line-width-picker',
  template: `
    <div class="line-width-picker-container">
      <input type="range" class="form-range" min="1" max="50" id="line-width" [defaultValue]="3" #width (input)="pickLineWidth(width.value)">
      <label for="line-width">Line Width: {{ value }}</label>
    </div>
  `,
  styleUrls: ['./line-width-picker.component.css']
})
export class LineWidthPickerComponent {

  value = "3";

  @Output() widthEvent = new EventEmitter<string>();

  pickLineWidth(value: string) {
    this.value = value;
    this.widthEvent.emit(value);
  }
}
