namespace BookingService.DTOs
{
    public class BookingDto
    {
        public class BookingCreateDto
        {

            public int PriceOfTicket { get; set; }
            public int MovieId { get; set; }
            public string Username { get; set; }
            public DateTime Showtime { get; set; }
            public int NumberOfTickets { get; set; }
        }

        public class BookingUpdateDto
        {
            public int NumberOfTickets { get; set; }
            public DateTime Showtime { get; set; }
            public string Status { get; set; }
        }
    }
}
