import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('board')
  private canvas!: ElementRef<HTMLCanvasElement>;


  private width: number = 1000;
  private height: number = 1000;

  // tested offset multipliers
  private offSetXMulti: number = 1.6;
  private offSetYMulti: number = 1.48;

  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  private prevPos!: {
    x: number,
    y: number }

  private paint: boolean = false;

  ngAfterViewInit(): void {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d')!;

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = "rgba(0, 0, 0, 1)";
    this.context.fillStyle = "rgba(255, 255, 255, 1)";
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  public releaseEventHandler = () => {
    this.paint=false;
  }

  public cancelEventHandler = () => {
    this.paint=false;
  }

  public pressEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as MouseEvent).pageX;
    let mouseY = (e as MouseEvent).pageY;

    let offSet = this.canvas.nativeElement.getBoundingClientRect();
    mouseX -= offSet.left;
    mouseY -= offSet.top;

    const currentPos = {
      x: mouseX,
      y: mouseY
    };
    this.prevPos = currentPos;
    this.paint = true;
    this.drawOnCanvas(this.prevPos,currentPos);
  }

  public dragEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as MouseEvent).pageX;
    let mouseY = (e as MouseEvent).pageY;

    let offSet = this.canvas.nativeElement.getBoundingClientRect();
    mouseX -= offSet.left;
    mouseY -= offSet.top;

    const currentPos = {
      x: mouseX,
      y: mouseY
    };

    if(this.paint){
      this.drawOnCanvas(this.prevPos,currentPos);
      this.prevPos = currentPos;
    }

    e.preventDefault();
  }

  public pickColor(value: string) {
    this.context.strokeStyle = value;
  }

  public pickLineWidth(value: number) {
    this.context.lineWidth = value;
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  )
  {
    // in case the context is not set
    if (!this.context) { return; }

    // start our drawing path
    this.context.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {

      //modify so it's in the same place as a cursor, it's ugly but it works on my laptop :)
      currentPos.x *= this.offSetXMulti;
      currentPos.y *= this.offSetYMulti;


      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();
    }
  }
}
