import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import * as canvasGauges from 'canvas-gauges';

declare var google: any;

@Component({
  selector: 'app-gauge, [app-gauge]',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GaugeComponent implements OnInit {
  @ViewChild('chart') public graph: ElementRef;
  private _value: number;
  @Input() public type: "SPEED" | "TEMP" | "HUMIDITY" | "ALTITUDE";
  @Input() public set value(newValue: number) {
    this._value = newValue;
    this.update(newValue);
  }
  public get value(): number {
    return this._value;
  }
  @Input() public title: string;
  private data: {
    setValue(val1: number, val2: number, val3: number);
  };
  private gauge: canvasGauges.RadialGauge;
  constructor() { }
  public ngOnInit() {
    var options = <canvasGauges.RadialGaugeOptions>{
      renderTo: this.graph.nativeElement,
      colorNumbers: 'red',
      width: 125,
      height: 125,
      animationDuration: 1500,
      animationRule: 'linear',
      valueInt: 1,
      valueDec: 0
    };

    if (this.type == 'SPEED') {
      options.units = 'Km/h';
      options.majorTicks = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220];
      options.minorTicks = 10;
      options.minValue = 0;
      options.maxValue = 220;
      options.highlights = [
        { "from": 160, "to": 220, "color": "rgba(200, 50, 50, .75)" }
      ];
    } else if (this.type == 'TEMP') {
      options.units = "°C";
      options.minValue = -50;
      options.maxValue = 50;
      options.majorTicks = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
      options.minorTicks = 10;
      options.needleCircleSize = 7;
      options.needleCircleOuter = true;
      options.needleCircleInner = false;
      options.startAngle = 67.5;
      options.ticksAngle = 225;
      options.needleType = 'arrow';
      options.highlights = [
        { "from": -50, "to": 0, "color": "rgba(187, 209, 231, .75)" },
        { "from": 0, "to": 50, "color": "rgba(200, 50, 50, .75)" }
      ];
    } else if (this.type == 'HUMIDITY') {
      options.units = "%";
      options.majorTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      options.minorTicks = 10;
    } else if (this.type == "ALTITUDE") {
      options.units = "m";
      options.majorTicks = new Array<number>();
      options.minValue = -100;
      options.maxValue = 2500;
      options.highlights = [];
      options.valueDec = 1;
      for (let i = -100; i < 2500; i = i + 250) {
        options.majorTicks.push(i);
      }
      options.majorTicks.push(2500);
      options.minorTicks = 2;
    }

    this.gauge = new canvasGauges
      .RadialGauge(options)
      .draw();
  }

  public update(value: number) {
    if (!!this.gauge) {
      switch (this.type) {
        case 'SPEED':
          this.gauge.value = value * 1.852;
          return;        
      }
      this.gauge.value = value;
    }
  }
}
