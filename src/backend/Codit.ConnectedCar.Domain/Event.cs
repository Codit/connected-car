using Newtonsoft.Json;

namespace Codit.ConnectedCar.Domain
{
    public class Event
    {
        public decimal Temp { get; set; }
        public decimal Humidity { get; set; }
        public decimal Light { get; set; }
        public EventGps Gps { get; set; }

        public Event(TelemetryData telemetryData)
        {
            Temp = telemetryData.Temp;
            Humidity = telemetryData.Humidity;
            Light = telemetryData.Light;
            Gps = new EventGps(telemetryData.Gps);
        }

        [JsonConstructor]
        public Event()
        {
            
        }
    }
}
