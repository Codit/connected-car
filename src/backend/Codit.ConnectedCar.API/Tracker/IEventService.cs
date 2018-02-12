using System.Collections.Generic;
using System.Threading.Tasks;
using Codit.ConnectedCar.Domain;

namespace Codit.ConnectedCar.API.Tracker
{
    public interface IEventService
    {
        Task<Event> GetLastEvent();
        void SaveLastEvent(Event @event);
        Task<IEnumerable<RouteHistory>> GetRouteHistory();
    }
}