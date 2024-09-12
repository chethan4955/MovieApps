using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BookingService.Models
{
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

       
        public int MovieId { get; set; }
        public string Username { get; set; }
        public DateTime Showtime { get; set; }
        public int NumberOfTickets { get; set; }
        public DateTime BookingDate { get; set; } 
        public int PriceOfTicket {  get; set; }
        public string Status { get; set; } // Status (e.g., "Booked", "Cancelled")


        //[BsonElement("bookings")]
        //public List<Booking> Bookings { get; set; }=new List<Booking>();
    }
}
