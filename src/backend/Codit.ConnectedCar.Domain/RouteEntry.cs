using System;

namespace Codit.ConnectedCar.Domain
{
    public class RouteEntry : IEquatable<RouteEntry>
    {
        public RouteEntry(TelemetryData telemetryData)
        {
            if (telemetryData.Gps == null)
                return;

            Latitude = telemetryData.Gps.Lat;
            Longitude = telemetryData.Gps.Lon;
        }

        public RouteEntry(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public double Latitude { get; }
        public double Longitude { get; }

        public bool Equals(RouteEntry other)
        {
            return Latitude == other.Latitude && Longitude == other.Longitude;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((RouteEntry) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (Latitude.GetHashCode() * 397) ^ Longitude.GetHashCode();
            }
        }
    }
}