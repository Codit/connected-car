namespace Codit.ConnectedCar.Domain
{
    public class EventGps
    {
        public EventGps(Gps telemetryDataGps)
        {
            Speed = telemetryDataGps?.Speed ?? 0;
            Lat = telemetryDataGps?.Lat ?? 0;
            Lon = telemetryDataGps?.Lon ?? 0;
            Alt = telemetryDataGps?.Alt ?? 0;
        }

        public EventGps()
        {
            
        }

        public double Speed { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public double Alt { get; set; }
    }
}