using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace Codit.ConnectedCar.API.Common
{
    public class StorageConnection
    {
        private readonly IOptions<TelemetryStorageConfig> storageConfig;
        protected readonly CloudTableClient tableClient;

        public StorageConnection(IOptions<TelemetryStorageConfig> storageConfig)
        {
            this.storageConfig = storageConfig;

            var storageAccount = CloudStorageAccount.Parse(storageConfig.Value.ConnectionString);
            this.tableClient = storageAccount.CreateCloudTableClient();
        }
    }
}
