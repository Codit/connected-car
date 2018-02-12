using System.Threading.Tasks;
using Codit.ConnectedCar.API.HistoricalData;
using Microsoft.AspNetCore.Mvc;

namespace Codit.ConnectedCar.API.Controllers
{
    [Route("api/HistoricalData")]
    public class HistoricalDataController : Controller
    {
        private readonly IHistoricalDataService historicalDataService;

        public HistoricalDataController(IHistoricalDataService historicalDataService)
        {
            this.historicalDataService = historicalDataService;
        }

        [HttpGet]
        [Route("hourly")]
        public async Task<IActionResult> GetHourlyData()
        {
            return new OkObjectResult(await this.historicalDataService.GetHourlyData());
        }

        [HttpGet]
        [Route("daily")]
        public async Task<IActionResult> GetDailyData()
        {
            return new OkObjectResult(await this.historicalDataService.GetDailyData());
        }

        [HttpGet]
        [Route("fifteenminutes")]
        public async Task<IActionResult> GetFifteenMinutesData()
        {
            return new OkObjectResult(await this.historicalDataService.GetFifteenMinuteData());
        }
    }
}