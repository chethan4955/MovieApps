using BookingService.Data;
using BookingService.DTOs;
using BookingService.Models;
using MongoDB.Driver;
using static BookingService.DTOs.BookingDto;

namespace BookingService.Service
{
    public class BookingsService
    {
         private readonly MongoDbContext _context;

    public BookingsService(MongoDbContext context)
    {
        _context = context;
    }

    public virtual async Task<Booking> ScheduleBookingAsync(BookingCreateDto createDto)
    {
        var booking = new Booking
        {
          
            MovieId = createDto.MovieId,
            Username = createDto.Username,
            Showtime = createDto.Showtime,
            NumberOfTickets = createDto.NumberOfTickets,
            BookingDate = DateTime.UtcNow,
            PriceOfTicket= createDto.PriceOfTicket,
            Status = "Booked"
        };

        await _context.Bookings.InsertOneAsync(booking);
        return booking;
    }


        public virtual async Task<IEnumerable<Booking>> GetBookingsByUsernameAsync(string username)
        {
            return await _context.Bookings.Find(b => b.Username == username).ToListAsync();
        }

        public virtual async Task<Booking> GetBookingByIdAsync(string id)
    {
        return await _context.Bookings.Find(b => b.Id == id).FirstOrDefaultAsync();
    }


        public virtual async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.Find(_ => true).ToListAsync();
        }


        public virtual async Task<bool> UpdateBookingAsync(string username, BookingUpdateDto updateDto)
    {
        var update = Builders<Booking>.Update
            .Set(b => b.NumberOfTickets, updateDto.NumberOfTickets)
            .Set(b => b.Showtime, updateDto.Showtime)
            .Set(b => b.Status, updateDto.Status);

        var result = await _context.Bookings.UpdateOneAsync(b => b.Username == username, update);
        return result.ModifiedCount > 0;
    }

        public virtual async Task<bool> CancelBookingAsync(string username)
        {
         var update = Builders<Booking>.Update.Set(b => b.Status, "Cancelled");
         var result = await _context.Bookings.UpdateOneAsync(b => b.Username == username, update);
         return result.ModifiedCount > 0;
        }
    }
}
