using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public class HistoricalData : TableEntity
    {
        public HistoricalData() { }

        public double averageairquality { get; set; }
        public double averagehumidity { get; set; }
        public double averagelight { get; set; }
        public double averagemotion { get; set; }
        public double averagesound { get; set; }
        public double averagetemp { get; set; }
        public double averagespeed { get; set; }
        public double averagealtitude { get; set; }
        public DateTime slicestart { get; set; }
    }
}
