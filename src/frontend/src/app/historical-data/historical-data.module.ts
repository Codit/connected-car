import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import { HistoricalDataService } from './historical-data.service';
import { HistoricalGraphComponent } from './historical-graph/historical-graph.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
    imports: [
        CommonModule,
        Ng2GoogleChartsModule,
        MatSelectModule,
        BrowserAnimationsModule
    ],
    declarations: [HistoricalGraphComponent],
    exports: [HistoricalGraphComponent],
    providers: [HistoricalDataService]
})
export class HistoricalDataModule {}
