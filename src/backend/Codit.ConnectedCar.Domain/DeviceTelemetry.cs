using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.Domain
{
    public class DeviceTelemetry : TableEntity
    {
        public int Light { get; set; }
        public int Sound { get; set; }
        public bool Motion { get; set; }
        public int AirQuality { get; set; }
        public decimal Temp { get; set; }
        public decimal Humidity { get; set; }
        public double Lon { get; set; }
        public double Lat { get; set; }
        public double Alt { get; set; }
        public double Speed { get; set; }
        public double Course { get; set; }
        public int GpsStatusCode { get; set; }
    }
}
