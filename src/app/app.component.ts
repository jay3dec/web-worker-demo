import { Component,OnInit, ViewEncapsulation, ViewChild, ElementRef  } from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  title = 'nvd3-graph';
  options;
  data;

  constructor(){}
  
  ngOnInit() {
    this.initChart();
    setInterval(()=>{
      this.updateChart();
    }, 500)
  }

  initChart(){
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        width: 500,
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }
  }

  updateChart()
  {
    this.data = [
      {
        values: [
          {
            "label" : "A" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "B" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "C" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "D" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "E" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "F" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "G" ,
            "value" : Math.floor(Math.random() * 100)
          } ,
          {
            "label" : "H" ,
            "value" : Math.floor(Math.random() * 100)
          }
        ]
      }
    ];
  }

  handleButtonClick(){
    this.clearCanvas();
    let canvas = this.createCanvas();
    document.getElementById('canContainer').append(canvas);
    let context = canvas.getContext("2d");
    context.beginPath();
    for(let x = 0; x < 691; x++){
      for(let y = 0; y < 491; y++){
        context.fillRect(x, y, 10, 10);
      }
    } 
  }

  handleWebWorkerProcess(){
    this.clearCanvas();
    let canvas = this.createCanvas();
    document.getElementById('canContainer').append(canvas);
    let offscreen = canvas.transferControlToOffscreen();
    let _worker = new Worker("./canvas.worker", { type: 'module' }); 
    _worker.onmessage = ({ data }) => {
        console.log(data);
    };
    _worker.postMessage({canvas: offscreen}, [offscreen]);
  }

  clearCanvas(){
    let element = <HTMLCanvasElement> document.getElementById('canContainer');
    element.innerHTML = ''
  }

  createCanvas(){
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width','700');
    canvas.setAttribute('height','500');
    return canvas;
  }
}
