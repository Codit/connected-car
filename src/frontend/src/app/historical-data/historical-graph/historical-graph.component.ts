import { Component, OnInit } from '@angular/core';
import { HistoricalDataService } from '../historical-data.service';
import { ViewChild } from '@angular/core';
import { HistoricalData } from '../historical-data';
import { format } from 'date-fns';

@Component({
    selector: 'app-historical-graph, [app-historical-graph]',
    templateUrl: './historical-graph.component.html',
    styleUrls: ['./historical-graph.component.scss']
})
export class HistoricalGraphComponent implements OnInit {
    @ViewChild('historicalchart') historicalchart;
    hasLoaded: boolean = false;

    graphTypes = [
        { value: 'speed', viewValue: 'Speed' },
        { value: 'temp', viewValue: 'Temperature' },
        { value: 'altitude', viewValue: 'Altitude' }
    ];
    selectedType = 'speed';

    graphIntervals = [
        { value: 'hourly', viewValue: 'Hourly' },
        { value: 'daily', viewValue: 'Daily' },
        { value: 'fifteenminutes', viewValue: 'Fifteen minutes' }
    ];
    selectedInterval = 'hourly';

    public historicalData: any = {
        chartType: 'LineChart',
        dataTable: [
            ['Time', 'Speed'],
            [format(Date.now(), 'D/M/YYYY H:mm'), 0]
        ],
        options: {
            title: 'Average speed per hour',
            legend: { position: 'none' }
        }
    };

    constructor(private historicalDataService: HistoricalDataService) {}

    ngOnInit() {}

    loadData(event) {
        if (!this.hasLoaded) {
            this.getDataBasedOnInterval();
        }
    }

    getDataBasedOnInterval() {
        this.historicalDataService
            .getHourlylData(this.selectedInterval)
            .subscribe((response: Array<HistoricalData>) => {
                this.pushDataToGraph(response);
            });
    }

    pushDataToGraph(data: Array<HistoricalData>) {
        let dataTable = this.historicalchart.wrapper.getDataTable();
        let options = this.historicalchart.wrapper.getOptions();
        options.title = `Average ${
            this.selectedType === 'speed'
                ? 'speed'
                : this.selectedType === 'temp' ? 'temperature' : 'altitude'
        } per ${
            this.selectedInterval === 'hourly'
                ? 'hour'
                : this.selectedInterval === 'daily' ? 'day' : '15 minutes'
        }`;
        // remove initial row with dummy data
        dataTable.removeRows(0, dataTable.getNumberOfRows());
        // remove data column
        dataTable.removeColumn(1);

        switch (this.selectedType) {
            case 'speed':
                dataTable.addColumn('number', 'Speed', 'speed');
                break;
            case 'temp':
                dataTable.addColumn('number', 'Temperature', 'temperature');
                break;
            case 'altitude':
                dataTable.addColumn('number', 'Altitude', 'altitude');
                break;
            default:
                dataTable.addColumn('number', 'Speed', 'speed');
                break;
        }

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            dataTable.addRow([
                format(item.sliceStart, 'D/M/YYYY H:mm'),
                this.selectedType === 'speed'
                    ? item.averageSpeed * 1.852
                    : this.selectedType === 'temp'
                      ? item.averageTemp
                      : item.averageAltitude
            ]);
        }
        this.hasLoaded = true;
        this.historicalchart.redraw();
    }

    typeChanged(event) {
        this.getDataBasedOnInterval();
    }

    intervalChanged(event) {
        this.getDataBasedOnInterval();
    }
}
