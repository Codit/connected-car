export class HistoricalData {
    public sliceStart: Date;
    public averageSpeed: number;
    public averageTemp: number;
    public averageAltitude: number;

    constructor(init?: Partial<HistoricalData>) {
        Object.assign(this, init);
    }
}
