import { Observable } from 'rxjs/Observable';
import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, filter } from 'rxjs/operators';

import * as selectors from '../app/tracker/store/tracker.selectors';
import { ITrackerState } from './tracker/store/index';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public position$: Observable<{ lat: number, lng: number }>;
	public todaysDistance$: Observable<number>;
	public totalDistance$: Observable<number>;
	constructor(private store: Store<ITrackerState>) {
		this.todaysDistance$ = this.store.select(selectors.todaysDistanceSelector);
		this.totalDistance$ = this.store.select(selectors.totalDistanceSelector);
		this.position$ = this.store
			.select(selectors.currentPositionSelector)
			.pipe(
			filter(position => !!position),
			map(position => {
				return {
					lat: position.latitude,
					lng: position.longitude
				};
			})
			);
	}
}
