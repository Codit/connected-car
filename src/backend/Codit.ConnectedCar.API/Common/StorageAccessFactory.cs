using Codit.ConnectedCar.API.HistoricalData;
using Codit.ConnectedCar.API.Tracker;
using Microsoft.Extensions.Options;

namespace Codit.ConnectedCar.API.Common
{
    public class StorageAccessFactory : IStorageAccessFactory
    {
        private readonly IOptions<TelemetryStorageConfig> storageConfig;

        public StorageAccessFactory(IOptions<TelemetryStorageConfig> storageConfig)
        {
            this.storageConfig = storageConfig;
        }

        public IHistoricalDataStorageConnection CreateHistoricalStorageConnection()
        {
            return new HistoricalDataStorageConnection(this.storageConfig);
        }

        public ITrackerStorageConnection CreateTrackerStorageConnection()
        {
            return new TrackerStorageConnection(this.storageConfig);
        }
    }
}
