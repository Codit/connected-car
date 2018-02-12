using System.Collections.Generic;
using System.Threading.Tasks;
using Codit.ConnectedCar.Domain;

namespace Codit.ConnectedCar.API.Tracker
{
    public interface ITrackerStorageConnection
    {
        Task<IEnumerable<TelemetryData>> GetTelemetryDataQuery(string filter, int take = 0);
    }
}
