import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import { MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lissajous';

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  private x0 = 500;
  private y0 = 350;
  private width = 1;

  sizeA = 1;
  sizeB = 1;

  private a = 1;
  private b = 2;
  delta: number = Math.PI / 2;
  isCoordinateSystemVisible: boolean = false;


  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawCoordinateSystem()
    this.drawLissajousFigure()
  }

  paint(A: string, B: string): void {
    this.a = +A;
    this.b = +B;
    console.log(this.b);
    console.log(this.a);
    this.refreshCanvas();
  }


  private drawCoordinateSystem(): void {
    if(this.isCoordinateSystemVisible) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(this.x0, 0, 1, 2 * this.y0);
      this.ctx.fillRect(0, this.y0, 2 * this.x0, 1);
    }else {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }

  private drawLissajousFigure() {
    const t = Array();
    for (let i = 0; i <= 2 * Math.PI; i += 0.001){
      t.push(i);
    }
    const x = Array();
    const y = Array();
    for(let value of t) {
        const xCalculated = this.sizeA * Math.sin(value * this.a + this.delta);
        x.push(xCalculated);
        const yCalculated = this.sizeB * Math.sin(value * this.b);
        y.push(yCalculated);
    }
    this.ctx.fillStyle = '#ffea3c';
    for(let i = 0; i < x.length; i++){
      this.ctx.fillRect(this.x0 + x[i]*100, this.y0 - y[i]*100, this.width, this.width);
    }

  }

  changeSizeA(value: number) {
    this.sizeA = value;
    this.refreshCanvas();
  }


  changeSizeB(value: number) {
    this.sizeB = value;
    this.refreshCanvas();
  }

  changeDelta(value: any) {
    console.log(value);
    if(value == "pi/2"){
      this.delta = Math.PI /2;
    }else if(value == "pi/4"){
      this.delta = Math.PI / 4;
    }else if(value == "pi/8"){
      this.delta = Math.PI / 8;
    }
    else if(value == "pi/16"){
      this.delta = Math.PI / 16;
    }
    else if(value == "pi"){
      this.delta = Math.PI;
    }
    this.refreshCanvas();

  }

  changeVisibleOfCoordinateSystem() {
    console.log(this.isCoordinateSystemVisible);
    this.drawCoordinateSystem();
    this.drawLissajousFigure();

  }


  private refreshCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawCoordinateSystem();
    this.drawLissajousFigure();
  }


}
