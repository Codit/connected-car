import { Observable } from 'rxjs/Observable';
import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, filter } from 'rxjs/operators';

import * as selectors from '../app/tracker/store/tracker.selectors';
import { ITrackerState } from './tracker/store/index';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	public position$: Observable<{ lat: number, lng: number }>;
	public todaysDistance$: Observable<number>;
	public totalDistance$: Observable<number>;
	@ViewChild('powerbi') public element: ElementRef;
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

	public ngAfterViewInit() {
		const config: any = {
			accessToken: 'eyJrIjoiYTg0YzZiZmMtZGI3MS00MWZlLWI1NDEtMjE2NDIxNzgwYzRkIiwidCI6Ijc1MTdiYzQyLWJjZjgtNDkxNi1hNjc3LWI1NzUzMDUxZjg0NiIsImMiOjh9',
			embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYTg0YzZiZmMtZGI3MS00MWZlLWI1NDEtMjE2NDIxNzgwYzRkIiwidCI6Ijc1MTdiYzQyLWJjZjgtNDkxNi1hNjc3LWI1NzUzMDUxZjg0NiIsImMiOjh9',
			id: 'a0d0077b-c9ee-4473-8e78-0b40b2619632',
			settings: {
				filterPaneEnabled: true,
				navContentPaneEnabled: true,
				customLayout: {
					displayOption: (<any>window['powerbi-models']).DisplayOption.FitToWidth
				}
			},
			tokenType: 1,
			type: "report"
		};

		(<any>window).powerbi.embed(this.element.nativeElement, config);
	}
}
