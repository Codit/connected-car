import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.scss']
})
export class StreetviewComponent implements OnInit {
  @ViewChild('map') streetviewMap: any;
  @ViewChild('pano') streetviewPano: any;
  @Input() public set position(pos: { lat: number, lng: number }) {
    this._position = pos;
    this.updatePosition();
  }
  public get position(): { lat: number, lng: number } {
    return this._position;
  }
  public heading: number = 34;
  public pitch: number = 10;
  public exists: boolean;
  private _position: { lat: number, lng: number } = { lat: 51, lng: 3 };
  private _panorama: {
    setPosition(pos: { lat: number, lng: number })
  };
  private sv: {
    getPanoramaByLocation(pos: { lat: number, lng: number }, nr: number, callback: (data: any, status: string) => void);
  };
  constructor(private mapsAPILoader: MapsAPILoader) { }
  public ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.sv = new window['google'].maps.StreetViewService();
      this.validatePosition();
      this._panorama = new window['google'].maps.StreetViewPanorama(
        this.streetviewPano.nativeElement, {
          position: this.position,
          pov: { heading: this.heading, pitch: this.pitch },
          scrollwheel: false
        });
    });
  }
  private updatePosition() {
    if (!!this._panorama && !!this._position) {
      this._panorama.setPosition(this._position);
      this.validatePosition();
    }
  }
  private validatePosition() {
    if (!!this.sv && !!this._position) {
      this.sv.getPanoramaByLocation(this.position, 50, (data, status) => {
        this.exists = status !== 'ZERO_RESULTS';
      });
    }
  }
}
