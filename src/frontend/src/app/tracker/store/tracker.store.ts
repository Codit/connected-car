import { ITrackEvent, IRoute, IRouteHistory } from './../tracker.service';
import * as actions from './tracker.actions';

export interface ITrackerState {
    currentPosition?: { latitude: number, longitude: number };
    data?: ITrackEvent,
    history?: IRouteHistory[],
    todaysDistance: number,
    totalDistance: number
}

const initialState: ITrackerState = {
    data: {
        humidity: 0,
        temp: 0
    },
    todaysDistance: 0,
    totalDistance: 0
};

export function trackerReducer(state: ITrackerState = initialState, action: actions.TrackerActions): ITrackerState {
    switch (action.type) {
        case actions.TODAY_DISTANCE:
            if (!!!state.todaysDistance) {
                return {
                    ...state,
                    todaysDistance: action.payload
                };
            } else {
                return {
                    ...state,
                    todaysDistance: state.todaysDistance + action.payload
                }
            }
        case actions.TOTAL_DISTANCE:
            if (!!!state.totalDistance) {
                return {
                    ...state,
                    totalDistance: action.payload
                };
            } else {
                return {
                    ...state,
                    totalDistance: state.totalDistance + action.payload
                }
            }
        case actions.TRACK:
            return {
                ...state,
                currentPosition: !!!action.payload || !!!action.payload.gps ? null : { latitude: action.payload.gps.lat, longitude: action.payload.gps.lon },
                data: action.payload
            };
        case actions.ROUTE_HISTORY_SUCCESS:
            return {
                ...state,
                history: action.payload
            };
        default:
            return state;
    }
}