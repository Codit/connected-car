using System;
using Codit.ConnectedCar.Domain;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;

namespace Codit.ConnectedCar.Functions
{
    public static class ToStorage
    {
        [FunctionName("ToStorage")]
        public static void Run(
            [ServiceBusTrigger("car-telemetry", "storage", AccessRights.Listen, Connection = "ConnectedCarServiceBus")] string rawTelemetryData,
            [Table("devicetelemetry", Connection = "ConnectedCarTableStorage")] out DeviceTelemetry deviceData, TraceWriter log)
        {
            var telemetryData = JsonConvert.DeserializeObject<TelemetryData>(rawTelemetryData);

            deviceData = new DeviceTelemetry
            {
                Humidity = telemetryData.Humidity,
                Light = telemetryData.Light,
                Motion = telemetryData.Motion,
                AirQuality = telemetryData.AirQuality,
                Sound = telemetryData.Sound,
                Temp = telemetryData.Temp,
                Lon = telemetryData.Gps.Lon,
                Lat = telemetryData.Gps.Lat,
                Speed = telemetryData.Gps.Speed,
                Course = telemetryData.Gps.Course,
                GpsStatusCode = telemetryData.Gps.GpsStatusCode,
                PartitionKey = "636508278883351383",
                RowKey = $"{DateTime.MaxValue.Ticks - DateTime.UtcNow.Ticks:D19}"
            };

            log.Info($"Succesfully proccessed event {rawTelemetryData}");
        }
    }
}