using System;
using Newtonsoft.Json;

namespace Codit.ConnectedCar.Domain
{
    public class TelemetryData
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        public int Light { get; set; }
        public int Sound { get; set; }
        public bool Motion { get; set; }
        public int AirQuality { get; set; }
        public decimal Temp { get; set; }
        public decimal Humidity { get; set; }
        public string Type => "TelemetryData";
        public DateTimeOffset Timestamp { get; set; }
        public Gps Gps { get; set; }
    }
}
