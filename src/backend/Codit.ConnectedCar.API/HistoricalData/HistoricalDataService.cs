using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Codit.ConnectedCar.API.Common;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public class HistoricalDataService : IHistoricalDataService
    {
        private readonly IStorageAccessFactory storageAccessFactory;

        public HistoricalDataService(IStorageAccessFactory storageAccessFactory)
        {
            this.storageAccessFactory = storageAccessFactory;
        }

        public async Task<IEnumerable<HistoricalDataDto>> GetHourlyData()
        {
            return await Get(async (connection) => await connection.GetHourlyData());
        }

        public async Task<IEnumerable<HistoricalDataDto>> GetDailyData()
        {
            return await Get(async (connection) => await connection.GetDailyData());
        }

        public async Task<IEnumerable<HistoricalDataDto>> GetFifteenMinuteData()
        {
            return await Get(async (connection) => await connection.GetFifteenMinuteData());
        }

        private async Task<IEnumerable<HistoricalDataDto>> Get(Func<IHistoricalDataStorageConnection, Task<IEnumerable<HistoricalData>>> getData)
        {
            var connection = this.storageAccessFactory.CreateHistoricalStorageConnection();
            var data = await getData(connection);

            var result = data.Select(o =>
            {
                return new HistoricalDataDto
                {
                    AverageSpeed = o.averagespeed,
                    AverageTemp = o.averagetemp,
                    AverageAltitude = o.averagealtitude,
                    SliceStart = o.slicestart
                };
            }).OrderBy(o => o.SliceStart).ToList();

            return result;
        }
    }
}
