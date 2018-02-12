import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';

import * as selectors from '../store/tracker.selectors';
import { ITrackerState } from '../store/index';
import { ITrackEvent } from './../tracker.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent {
  @Input() public todaysDistance: number;
  @Input() public totalDistance: number;
  public data$: Observable<ITrackEvent>;
  constructor(private store: Store<ITrackerState>) {
    this.data$ = this.store.select(selectors.dataSelector);
  }
}
