using Codit.ConnectedCar.API.HistoricalData;
using Codit.ConnectedCar.API.Tracker;

namespace Codit.ConnectedCar.API.Common
{
    public interface IStorageAccessFactory
    {
        IHistoricalDataStorageConnection CreateHistoricalStorageConnection();
        ITrackerStorageConnection CreateTrackerStorageConnection();
    }
}
