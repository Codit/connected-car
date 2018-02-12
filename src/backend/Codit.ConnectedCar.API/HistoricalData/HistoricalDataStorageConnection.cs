using System.Collections.Generic;
using System.Threading.Tasks;
using Codit.ConnectedCar.API.Common;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.API.HistoricalData
{
    public class HistoricalDataStorageConnection : StorageConnection, IHistoricalDataStorageConnection
    {
        public HistoricalDataStorageConnection(IOptions<TelemetryStorageConfig> storageConfig)
            : base(storageConfig)
        { }

        public async Task<IEnumerable<HistoricalData>> GetHourlyData()
        {
            return await Get("aggregateddata1hour", "636508278883351383");
        }

        public async Task<IEnumerable<HistoricalData>> GetFifteenMinuteData()
        {
            return await Get("aggregateddata15min", "636508278883351383");
        }

        public async Task<IEnumerable<HistoricalData>> GetDailyData()
        {
            return await Get("aggregateddata1day", "636508278883351383");
        }

        private async Task<IEnumerable<HistoricalData>> Get(string tableName, string partitionKey)
        {
            var table = this.tableClient.GetTableReference(tableName);
            var query = new TableQuery<HistoricalData>();//.Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey));

            var results = new List<HistoricalData>();
            TableContinuationToken continuationToken = null;

            do
            {
                var queryResults = await table.ExecuteQuerySegmentedAsync(query, continuationToken);

                continuationToken = queryResults.ContinuationToken;

                results.AddRange(queryResults.Results);

            } while (continuationToken != null);

            return results;
        }
    }
}
