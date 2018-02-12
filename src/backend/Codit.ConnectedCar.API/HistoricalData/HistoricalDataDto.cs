using System;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public class HistoricalDataDto
    {
        public double AverageTemp { get; set; }
        public double AverageSpeed { get; set; }
        public double AverageAltitude { get; set; }
        public DateTime SliceStart { get; set; }
    }
}
