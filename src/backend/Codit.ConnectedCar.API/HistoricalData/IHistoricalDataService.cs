using System.Collections.Generic;
using System.Threading.Tasks;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public interface IHistoricalDataService
    {
        Task<IEnumerable<HistoricalDataDto>> GetHourlyData();
        Task<IEnumerable<HistoricalDataDto>> GetDailyData();
        Task<IEnumerable<HistoricalDataDto>> GetFifteenMinuteData();
    }
}
