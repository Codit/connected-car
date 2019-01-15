import { Store } from '@ngrx/store';
import { ITrackerState } from './../store/tracker.store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { take, filter, timeInterval } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { latLng, map, Map, TileLayer, tileLayer, marker, Marker, DivIcon, LatLng, polyline, Polyline, Icon, icon } from 'leaflet';
import { } from '@types/googlemaps';

import * as selectors from '../store/tracker.selectors';
import { IRoute, IRouteHistory } from './../tracker.service';
import { environment } from '../../../environments/environment';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  @ViewChild('map') public map: ElementRef;
  private leaflet: Map;
  private carMarker: Marker;
  private carIcon: Icon;
  private routes$: Observable<IRouteHistory[]>;
  private latestPolyLine: Polyline;
  private isInitial = true;
  constructor(private store: Store<ITrackerState>, private mapsApiLoader: MapsAPILoader) {
    this.routes$ = this.store.select(selectors.routeHistorySelector);
  }
  ngOnInit() {
    const startIcon = new DivIcon({
      className: 'test',
      iconSize: [50, 50]
    });

    const finishIcon = new Icon({
      iconUrl: 'assets/markers/finish.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 40]
    });

    this.carIcon = new Icon({
      iconUrl: 'assets/markers/car.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 40]
    });

    this.leaflet = map(this.map.nativeElement);
    this.leaflet.setView([49.454105, 9.592735], 6);
    var layer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 15, attribution: 'Open Street Map' });
    layer.addTo(this.leaflet);

    var current = 0;
    var colors = ['blue', 'orange', 'yellow', 'gray', 'green', 'brown', 'purple', 'lime', 'azure', 'coral', 'cornsmilk'];
    const today = new Date().setHours(0, 0, 0, 0);
    this
      .routes$
      .pipe(
      filter(result => !!result),
      take(1)
      )
      .subscribe(result => {
        const polyLines = result.reverse().map(history => {
          const polyLine = polyline(history.entries.map(entry => new LatLng(entry.latitude, entry.longitude), { weight: 5 })).addTo(this.leaflet);
          this.createMarker(history.entries[history.entries.length - 1].latitude, history.entries[history.entries.length - 1].longitude, startIcon);
          if (new Date(history.timeStamp).setHours(0, 0, 0, 0) < today) {
            this.createMarker(history.entries[0].latitude, history.entries[0].longitude, finishIcon);
          }
          polyLine.setStyle({
            color: colors[current]
          })
          current++;
          return polyLine;
        });        
      });

    this.latestPolyLine = polyline([], { weight: 5 });
    this.latestPolyLine.addTo(this.leaflet);
    this.latestPolyLine.setStyle({
      color: 'red'
    })

    this
      .store
      .select(selectors.currentPositionSelector)
      .pipe(
      filter(result => !!result)
      )
      .subscribe(result => {
        this.latestPolyLine.addLatLng(new LatLng(result.latitude, result.longitude));
        this.setPosition(result.latitude, result.longitude);
      });
  }
  private createMarker(latitude: number, longitude: number, icon: any) {
    var coordinates = new LatLng(latitude, longitude);
    marker(coordinates, {
      icon: icon
    })
      .addTo(this.leaflet);
  }
  public setPosition(latitude: number, longitude: number) {
    if (!!this.carMarker) {
      this.leaflet.removeLayer(this.carMarker);
    }
    const coords = latLng(latitude, longitude);
    this.carMarker = marker(coords, { icon: this.carIcon }).addTo(this.leaflet);
    if (this.isInitial) {
      this.isInitial = false;
      this.leaflet.setView(coords, 8);
    }
  }
}
