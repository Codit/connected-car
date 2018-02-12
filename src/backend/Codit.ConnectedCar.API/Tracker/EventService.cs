using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Codit.ConnectedCar.API.Common;
using Codit.ConnectedCar.Domain;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.API.Tracker
{
    public class EventService : IEventService
    {
        private readonly IMemoryCache memoryCache;
        private readonly IStorageAccessFactory storageAccessFactory;

        public EventService(IMemoryCache memoryCache, IStorageAccessFactory storageAccessFactory)
        {
            this.memoryCache = memoryCache;
            this.storageAccessFactory = storageAccessFactory;
        }

        /// <summary>
        ///     Get the last event
        /// </summary>
        /// <returns></returns>
        public async Task<Event> GetLastEvent()
        {
            if (!memoryCache.TryGetValue("lastevent", out Event result))
                return await GetLastData();

            return result;
        }

        /// <summary>
        ///     Cache the last event
        /// </summary>
        /// <param name="event">The event.</param>
        public void SaveLastEvent(Event @event)
        {
            memoryCache.Set("lastevent", @event);
        }

        /// <summary>
        ///     Get the historical route
        /// </summary>
        /// <returns>List containing each route entry point</returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<IEnumerable<RouteHistory>> GetRouteHistory()
        {
            var factory = storageAccessFactory.CreateTrackerStorageConnection();
            var route = (await factory
                    .GetTelemetryDataQuery(TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.GreaterThan, (DateTime.MaxValue.Ticks - DateTime.UtcNow.Ticks).ToString("D19"))))
                .GroupBy(telemetry => telemetry.Timestamp.Date)
                .Select(telemetry => new RouteHistory
                {
                    Entries = telemetry.Select(entry => new RouteEntry(entry)).Where(x => x.Latitude != 0 && x.Longitude != 0).Distinct(),
                    TimeStamp = telemetry.Key
                })
                .ToList();
            return route;
        }

        private async Task<Event> GetLastData()
        {
            var factory = storageAccessFactory.CreateTrackerStorageConnection();
            var lastTelemetryData = (await factory.GetTelemetryDataQuery(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "636508278883351383"), 1)).FirstOrDefault();
            if (lastTelemetryData != null)
                return new Event(lastTelemetryData);

            return null;
        }
    }
}