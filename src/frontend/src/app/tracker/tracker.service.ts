import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client/dist/browser/signalr-clientES5-1.0.0-alpha2-final.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';
import * as actions from './store/tracker.actions';
import { ITrackerState } from './store/index';

export interface ITrackEvent {
    temp?: number;
    humidity?: number;
    gps?: IGpsEvent;
}

export interface IGpsEvent {
    lat?: number;
    lon?: number;
    speed?: number;
}

export interface IRoute {
    latitude?: number;
    longitude?: number;
}

export interface IRouteHistory {
    timeStamp: Date;
    entries: Array<IRoute>;
}

@Injectable()
export class TrackerService {
    private hubConnection: HubConnection;
    private isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(private store: Store<ITrackerState>, private http: HttpClient) {
        this.hubConnection = new HubConnection(environment.hubUri);
        this.hubConnection.on('track', (payload: ITrackEvent) => {
            this.store.dispatch(new actions.TrackAction(payload));
        });
    }
    public start() {
        this.hubConnection
            .start()
            .then(() => this.isConnected.next(true))
            .catch(e => this.isConnected.next(false));
    }
    public getLatest(): Observable<ITrackEvent> {
        return this.http
            .get<ITrackEvent>(`${environment.apiUri}track`)
            .do(result => {
                if (!!result) {
                    this.store.dispatch(new actions.TrackAction(result));
                }
            });
    }
    public getHistory(): Observable<IRouteHistory[]> {
        return this.http
            .get<IRouteHistory[]>(`${environment.apiUri}track/routehistory`)
            .do(result => {
                if (!!result) {
                    this.store.dispatch(
                        new actions.RouteHistorySuccessAction(result)
                    );
                }
            });
    }
}
