using System;
using System.Collections.Generic;

namespace Codit.ConnectedCar.Domain
{
    public class RouteHistory
    {
        public DateTimeOffset TimeStamp { get; set; }
        public IEnumerable<RouteEntry> Entries { get; set; }
    }
}