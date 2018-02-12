using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Codit.ConnectedCar.Domain;
using Microsoft.Azure.WebJobs;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;

namespace Codit.ConnectedCar.Functions
{
    public static class RealTime
    {
        public static string GetEnvironmentVariable(string name)
        {
            return Environment.GetEnvironmentVariable(name, EnvironmentVariableTarget.Process);
        }

        [FunctionName("RealTime")]
        public static async Task Run([ServiceBusTrigger("car-telemetry", "real-time", AccessRights.Listen, Connection = "ConnectedCarServiceBus")] string telemetryData)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("api-key", GetEnvironmentVariable("RealTimeApiKey"));
                var eventData = JsonConvert.DeserializeObject<Event>(telemetryData);
                var result = await client.PostAsync(GetEnvironmentVariable("RealTimeApiAddress"), new StringContent(JsonConvert.SerializeObject(eventData), Encoding.UTF8, "application/json"));
                result.EnsureSuccessStatusCode();
            }
        }
    }
}