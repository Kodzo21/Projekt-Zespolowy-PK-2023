import {AfterViewInit,  Component, ElementRef, ViewChild} from '@angular/core';
import {WebsocketService} from "../_services/websocket.service";
import {Canvas} from "../_models/canvas";
import {Router} from "@angular/router";

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

  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  private prevPos!: {
    x: number,
    y: number }

  private paint: boolean = false;

  private drawLine: boolean = false;
  private erase: boolean = false;

  public backgroundURL: string = "/assets/images/No_image.svg";

  private data: string|undefined ="";

  private timeout: number = 0;

  private readonly conversationId: number;

  constructor(
    private webSocketService: WebsocketService,
    private router : Router
  ) {
      this.conversationId = this.router.getCurrentNavigation()?.extras?.state?.['conversationId'];

      if(!this.conversationId){
        this.conversationId = -1;
      }
  }

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

    //subscribe to webSocket and refresh canvas data any time they change
    this.webSocketService.canvasMap.subscribe(map => {
      this.data = map.get(this.conversationId);
      this.loadData();
      console.log("data change");
    })
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.drawLine = false;
    this.erase = false;
  }

  public releaseEventHandler = (e: MouseEvent | TouchEvent) => {

    if(this.drawLine){
      const currentPos = this.mousePosition(e);
      this.drawLineOnCanvas(this.prevPos,currentPos);
    }
    this.paint = false;
  }

  public cancelEventHandler = () => {
    this.paint = false;
  }

  public pressEventHandler = (e: MouseEvent | TouchEvent) => {

    const currentPos = this.mousePosition(e);

    this.prevPos = currentPos;
    this.paint = true;
    if(!this.drawLine){
      this.drawOnCanvas(this.prevPos,currentPos);
    }
  }

  public dragEventHandler = (e: MouseEvent | TouchEvent) => {

    const currentPos = this.mousePosition(e);

    if(this.paint && !this.drawLine){
      this.drawOnCanvas(this.prevPos,currentPos);
      this.prevPos = currentPos;
    }
    e.preventDefault();
  }

  public pickColor(value: string) {
    this.context.strokeStyle = value;
  }

  public pickLineWidth(value: string) {
    this.context.lineWidth = +value;
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

    if(this.erase){
      this.context.globalCompositeOperation="destination-out";
    }
    else{
      this.context.globalCompositeOperation="source-over";
    }

    // we're drawing lines so we need a previous position
    if (prevPos) {

      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();

      const root = this;
      let canvas : Canvas;
      if(root.timeout) clearTimeout(root.timeout);

      this.timeout = setTimeout(function (){
        root.saveData();

        if(root.data){
          canvas = {
            conversationId: root.conversationId,
            data: root.data
          }
        }

        root.webSocketService.sendCanvas(canvas);

      },1000);
    }
  }

  private drawLineOnCanvas(
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

      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();
    }
  }

  private mousePosition = (e: MouseEvent | TouchEvent) =>{
    let mouseX = (e as MouseEvent).clientX;
    let mouseY = (e as MouseEvent).clientY;

    let offSet = this.canvas.nativeElement.getBoundingClientRect();
    mouseX = (mouseX - offSet.left)/(offSet.right - offSet.left) * this.width;
    mouseY = (mouseY - offSet.top)/(offSet.bottom - offSet.top) * this.height;

    return {
      x: mouseX,
      y: mouseY
    };
  }


  public changeLineDrawing(){
    this.drawLine = !this.drawLine;
    this.erase = false;
  }

  public changeEraseMode(){
    this.erase = !this.erase;
    this.drawLine = false;
  }

  public pickImage(event: Event) {
    let files, url;

    if(event){
      files = (event.target as HTMLInputElement).files;
    }

    if(files && files.item(0)){
      url = window.URL.createObjectURL(files[0]);
      this.backgroundURL = url;
    }
  }

  public clearBackground() {
    this.backgroundURL = "/assets/images/No_image.svg";
  }

  public saveData(){
    this.data = this.canvas.nativeElement.toDataURL("image/png",1.0);
  }

  public loadData(){
    const image = new Image();
    const ctx = this.context;

    image.onload = function (){
      ctx.drawImage(image,0,0);
    }

    if(this.data){
      image.src = this.data;
    }
  }
}
