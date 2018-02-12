using System.Threading.Tasks;
using Codit.ConnectedCar.API.Authorization;
using Codit.ConnectedCar.API.Tracker;
using Codit.ConnectedCar.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Codit.ConnectedCar.API.Controllers
{
    [Route("api/[controller]")]
    public class TrackController : Controller
    {
        private readonly IEventService eventService;
        private readonly IHubContext<TrackerHub> hub;

        public TrackController(IHubContext<TrackerHub> hub, IEventService eventService)
        {
            this.hub = hub;
            this.eventService = eventService;
        }

        [HttpPost]
        [ServiceFilter(typeof(ApiKeyAttribute))]
        public async Task<IActionResult> Track([FromBody] Event trackEvent)
        {
            eventService.SaveLastEvent(trackEvent);
            await hub.Clients.All.InvokeAsync("track", trackEvent);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new OkObjectResult(await eventService.GetLastEvent());
        }

        [HttpGet]
        [Route("routehistory")]
        public async Task<IActionResult> GetRouteHistory()
        {
            return new OkObjectResult(await eventService.GetRouteHistory());
        }
    }
}