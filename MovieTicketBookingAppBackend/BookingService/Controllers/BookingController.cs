

using BookingService.Service;
using Microsoft.AspNetCore.Mvc;
using static BookingService.DTOs.BookingDto;

namespace BookingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly BookingsService _bookingService;

        public BookingController(BookingsService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            if (bookings == null || !bookings.Any())
            {
                return NotFound();
            }

            return Ok(bookings);
        }



        [HttpPost]
        public async Task<IActionResult> ScheduleBooking([FromBody] BookingCreateDto createDto)
        {
            var booking = await _bookingService.ScheduleBookingAsync(createDto);
            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(string id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

      
     

        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetBookingByUsername(string username)
        {
            var bookings = await _bookingService.GetBookingsByUsernameAsync(username);
            if (bookings == null || !bookings.Any())
            {
                return NotFound();
            }

            return Ok(bookings);
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateBooking(string username, [FromBody] BookingUpdateDto updateDto)
        {
            var result = await _bookingService.UpdateBookingAsync(username, updateDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{username}")]
        public async Task<IActionResult> CancelBooking(string username)
        {
            var result = await _bookingService.CancelBookingAsync(username);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetBookingCount()
        {
            var count = await _bookingService.GetBookingCountAsync();
            return Ok(new { Count = count });
        }
    }
}

