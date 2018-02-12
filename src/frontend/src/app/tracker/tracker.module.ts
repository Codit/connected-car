import { MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { trackerReducer } from './store';
import { TrackerService } from './tracker.service';
import { MapComponent } from './map/map.component';
import { TrackerComponent } from './tracker/tracker.component';
import { GaugeComponent } from './gauge/gauge.component';
import { GraphsComponent } from './graphs/graphs.component';
import { StreetviewComponent } from './streetview/streetview.component';
import { CardComponent } from './card/card.component';
import { TrackerEffects } from './store/tracker.effects';

export function reducer(): any {
  return { tracker: trackerReducer }
}

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    StoreModule.forFeature('tracker', reducer()),
    EffectsModule.forFeature([TrackerEffects]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZDbFi0xzzv7p9AC8oBO_BWcDsqVFKbf4'
    }),
    HttpClientModule
  ],
  declarations: [
    MapComponent,
    TrackerComponent,
    GaugeComponent,
    GraphsComponent,
    StreetviewComponent,
    CardComponent
  ],
  providers: [
    TrackerService
  ],
  exports: [
    TrackerComponent,
    GraphsComponent,
    StreetviewComponent,
    CardComponent
  ]
})
export class TrackerModule {
  constructor(private trackerService: TrackerService) {
    this.trackerService.start();
    this.trackerService.getHistory().pipe(take(1)).subscribe();
    this
      .trackerService
      .getLatest()
      .pipe(take(1))
      .subscribe();
  }
}
