import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, bufferCount } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LatLng } from "leaflet";

import * as actions from './tracker.actions';
import { IRoute } from "../tracker.service";

@Injectable()
export class TrackerEffects {
    @Effect() historyLoaded$ = this.actions$.pipe(
        ofType(actions.ROUTE_HISTORY_SUCCESS),
        switchMap((action: actions.RouteHistorySuccessAction) => {
            const latLng = action
                .payload[action.payload.length - 1]
                .entries;

            let distanceToday = 0;
            let totalDistance = 0;

            if (!!latLng && latLng.length > 0) {
                distanceToday = this.calculateDistance(latLng);
                for (let i = 0; i < action.payload.length; i++) {
                    totalDistance = totalDistance + this.calculateDistance(action.payload[i].entries);
                }

                return [new actions.TodayDistanceAction(distanceToday / 1000), new actions.TotalDistance(totalDistance / 1000)];
            }

            return [new actions.TodayDistanceAction(0), new actions.TotalDistance(0)];
        })
    );
    @Effect() track$ = this.actions$.pipe(
        ofType<actions.TrackAction>(actions.TRACK),
        bufferCount(2, 1),
        switchMap((a, b) => {
            const previous = a[0].payload.gps;
            const next = a[1].payload.gps;
            const previousLatLng = new LatLng(previous.lat, previous.lon);
            const nextLatLng = new LatLng(next.lat, next.lon);
            const distance = previousLatLng.distanceTo(nextLatLng) / 1000;
            return [new actions.TodayDistanceAction(distance), new actions.TotalDistance(distance)];
        })
    );
    constructor(private actions$: Actions) { }
    private calculateDistance(routes: IRoute[]): number {
        let distance = 0;
        for (let i = 0; i < routes.length - 1; i++) {
            distance = distance + new LatLng(routes[i].latitude, routes[i].longitude).distanceTo(new LatLng(routes[i + 1].latitude, routes[i + 1].longitude));
        }
        return distance;
    }
}