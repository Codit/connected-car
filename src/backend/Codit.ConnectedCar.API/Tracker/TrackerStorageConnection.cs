using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Codit.ConnectedCar.API.Common;
using Codit.ConnectedCar.Domain;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.API.Tracker
{
    public class TrackerStorageConnection : StorageConnection, ITrackerStorageConnection
    {
        public TrackerStorageConnection(IOptions<TelemetryStorageConfig> storageConfig)
            : base(storageConfig)
        {
        }


        public async Task<IEnumerable<TelemetryData>> GetTelemetryDataQuery(string filter, int take = 0)
        {
            var table = this.tableClient.GetTableReference("devicetelemetry");
            var query = new TableQuery<DeviceTelemetry>().Where(filter);

            if(take > 0)
            {
                query = query.Take(take);
            }

            var results = new List<TelemetryData>();
            TableContinuationToken continuationToken = null;

            do
            {
                var queryResults = await table.ExecuteQuerySegmentedAsync(query, continuationToken);

                continuationToken = queryResults.ContinuationToken;

                results.AddRange(queryResults.Results.Select(o => new TelemetryData
                {
                    AirQuality = o.AirQuality,
                    Gps = new Gps
                    {
                        Alt = o.Alt,
                        Course = o.Course,
                        GpsStatusCode = o.GpsStatusCode,
                        Lat = o.Lat,
                        Lon = o.Lon,
                        Speed = o.Speed
                    },
                    Humidity = o.Humidity,
                    Light = o.Light,
                    Motion = o.Motion,
                    Sound = o.Sound,
                    Temp = o.Temp,
                    Timestamp = o.Timestamp
                }));

            } while (continuationToken != null && take == 0);

            return results;
        } 
    }
}