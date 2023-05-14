import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineWidthPickerComponent } from './line-width-picker.component';

describe('LineWidthPickerComponent', () => {
  let component: LineWidthPickerComponent;
  let fixture: ComponentFixture<LineWidthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineWidthPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineWidthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
