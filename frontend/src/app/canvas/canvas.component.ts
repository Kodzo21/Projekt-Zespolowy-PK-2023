import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  @Input() color: string = "black";

  @ViewChild('board')
  private canvas!: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private paint: boolean = false;

  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;
  }

  constructor() {
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 1;

    this.redraw();
  }

  private redraw() {
    let clickX = this.clickX;
    let context = this.context;
    let clickDrag = this.clickDrag;
    let clickY = this.clickY;
    this.context.lineWidth = 1;

    for (let i = 0; i < clickX.length; ++i) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }

      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
  }

  private addClick(x: number, y: number, dragging: boolean) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  public clearCanvas() {
    this.context
      .clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  public releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
  }

  public cancelEventHandler = () => {
    this.paint = false;
  }

  public pressEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as MouseEvent).pageX;
    let mouseY = (e as MouseEvent).pageY;
    console.log("Before:", mouseX, mouseY);
    mouseX -= this.canvas.nativeElement.offsetLeft;
    mouseY -= this.canvas.nativeElement.offsetTop;
    console.log("After:", mouseX, mouseY);

    this.paint = true;
    this.addClick(mouseX / 3.8, mouseY / 5.5, false);
    this.redraw();
  }

  public dragEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as MouseEvent).pageX;
    let mouseY = (e as MouseEvent).pageY;
    mouseX -= this.canvas.nativeElement.offsetLeft;
    mouseY -= this.canvas.nativeElement.offsetTop;
    //console.log(mouseX,mouseY);

    if (this.paint) {
      this.addClick(mouseX / 3.8, mouseY / 5.5, true);
      this.redraw();
    }

    e.preventDefault();
  }

  addColor(value: string) {
    this.context.strokeStyle = value;
  }
}
