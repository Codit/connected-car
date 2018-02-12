import { Action } from "@ngrx/store";

import { ITrackEvent, IRoute, IRouteHistory } from './../tracker.service';

export const TRACK = '[Tracker] track';
export const ROUTE_HISTORY_SUCCESS = '[Tracker] Route history success';
export const TODAY_DISTANCE = '[Tracker] Today distance';
export const TOTAL_DISTANCE = '[Tracker] Total distance';

export class TrackAction implements Action {
    readonly type = TRACK;
    constructor(public payload: ITrackEvent) { }
}

export class RouteHistorySuccessAction implements Action {
    readonly type = ROUTE_HISTORY_SUCCESS;
    constructor(public payload: IRouteHistory[]) { }
}

export class TodayDistanceAction implements Action {
    readonly type = TODAY_DISTANCE;
    constructor(public payload: number) { }
}

export class TotalDistance implements Action {
    readonly type = TOTAL_DISTANCE;
    constructor(public payload: number) { }
}

export type TrackerActions =
    TrackAction
    | RouteHistorySuccessAction
    | TodayDistanceAction
    | TotalDistance;
