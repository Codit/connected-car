using System.Collections.Generic;
using System.Threading.Tasks;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public interface IHistoricalDataStorageConnection
    {
        Task<IEnumerable<HistoricalData>> GetHourlyData();
        Task<IEnumerable<HistoricalData>> GetFifteenMinuteData();
        Task<IEnumerable<HistoricalData>> GetDailyData();
    }
}
