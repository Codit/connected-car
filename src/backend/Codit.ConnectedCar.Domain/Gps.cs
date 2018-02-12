namespace Codit.ConnectedCar.Domain
{
    public class Gps
    {
        public string LastUpdateUtc { get; set; }
        public int SatCount { get; set; }
        public double Lon { get; set; }
        public double Lat { get; set; }
        public double Alt { get; set; }
        public double Speed { get; set; }
        public double Course { get; set; }
        public int GpsStatusCode { get; set; }
    }
}