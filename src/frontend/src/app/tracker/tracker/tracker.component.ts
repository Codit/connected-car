import { Component, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as selectors from '../store/tracker.selectors'
import { MapComponent } from '../map/map.component';
import { ITrackerState } from '../store/index';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements AfterViewInit {
  @ViewChild('map') private map: MapComponent;
  constructor(private store: Store<ITrackerState>) {
  }

  ngAfterViewInit() {
    this
      .store
      .select(selectors.currentPositionSelector)
      .pipe(
      filter(x => !!x)
      )
      .subscribe(result => {
        this.map.setPosition(result.latitude, result.longitude);
      });
  }
}
