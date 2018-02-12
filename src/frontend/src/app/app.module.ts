import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { TrackerModule } from './tracker/tracker.module';
import { AppComponent } from './app.component';
import { HistoricalDataModule } from './historical-data/historical-data.module';
import { EffectsModule } from '@ngrx/effects';
import { DecimalPipe } from './decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DecimalPipe
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot([]),
    TrackerModule,
    HistoricalDataModule,
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        maxAge: 15
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
