import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ITrackerState } from './tracker.store';

const moduleSelector = createSelector(createFeatureSelector<{ tracker: ITrackerState }>('tracker'), x => x.tracker);
export const currentPositionSelector = createSelector(moduleSelector, x => x.currentPosition);
export const dataSelector = createSelector(moduleSelector, x => x.data);
export const routeHistorySelector = createSelector(moduleSelector, x => x.history);
export const todaysDistanceSelector = createSelector(moduleSelector, x => x.todaysDistance);
export const totalDistanceSelector = createSelector(moduleSelector, x => x.totalDistance);
