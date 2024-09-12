//uusing BookingService.Controllers;
//using BookingService.Models;
//using BookingService.Service;
using Microsoft.AspNetCore.Mvc;
//using Moq;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using static BookingService.DTOs.BookingDto;
using BookingService.Models;
using BookingService.Service;
using BookingService.Controllers;
using Moq;
using System.Collections.Generic;
using System.Text;
using static BookingService.DTOs.BookingDto;

namespace MovieAppTesting
{

    [TestFixture]
    public class BookingControllerTests
    {
        private Mock<BookingsService> _mockBookingService;
        private BookingController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockBookingService = new Mock<BookingsService>(null); // Null since we're mocking
            _controller = new BookingController(_mockBookingService.Object);
        }

        [Test]
        public async Task ScheduleBooking_ShouldReturnCreatedAtAction_WhenBookingIsSuccessful()
        {
            // Arrange
            var createDto = new BookingCreateDto
            {
                UserId = 1,
                MovieId = 1,
                Username = "JohnDoe",
                Showtime = DateTime.Now,
                NumberOfTickets = 2
            };
            var expectedBooking = new Booking
            {
                Id = "1",
                UserId = createDto.UserId,
                MovieId = createDto.MovieId,
                Username = createDto.Username,
                Showtime = createDto.Showtime,
                NumberOfTickets = createDto.NumberOfTickets,
                Status = "Booked"
            };

            _mockBookingService.Setup(service => service.ScheduleBookingAsync(createDto))
                               .ReturnsAsync(expectedBooking);

            // Act
            var result = await _controller.ScheduleBooking(createDto);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(nameof(_controller.GetBookingById), createdAtActionResult.ActionName);
            Assert.AreEqual(expectedBooking.Id, createdAtActionResult.RouteValues["id"]);
            Assert.AreEqual(expectedBooking, createdAtActionResult.Value);
        }

        [Test]
        public async Task GetBookingById_ShouldReturnOk_WhenBookingExists()
        {
            // Arrange
            var bookingId = "1";
            var expectedBooking = new Booking
            {
                Id = bookingId,
                UserId = 1,
                MovieId = 1,
                Username = "JohnDoe",
                Showtime = DateTime.Now,
                NumberOfTickets = 2,
                Status = "Booked"
            };

            _mockBookingService.Setup(service => service.GetBookingByIdAsync(bookingId))
                               .ReturnsAsync(expectedBooking);

            // Act
            var result = await _controller.GetBookingById(bookingId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(expectedBooking, okResult.Value);
        }

        [Test]
        public async Task GetBookingById_ShouldReturnNotFound_WhenBookingDoesNotExist()
        {
            // Arrange
            var bookingId = "nonexistent";
            _mockBookingService.Setup(service => service.GetBookingByIdAsync(bookingId))
                               .ReturnsAsync((Booking)null);

            // Act
            var result = await _controller.GetBookingById(bookingId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task GetBookingsByUserId_ShouldReturnOk_WhenBookingsExist()
        {
            // Arrange
            var userId = 1;
            var bookings = new List<Booking>
            {
                new Booking { Id = "1", UserId = userId, MovieId = 1, Username = "JohnDoe", Showtime = DateTime.Now, NumberOfTickets = 2, Status = "Booked" },
                new Booking { Id = "2", UserId = userId, MovieId = 2, Username = "JohnDoe", Showtime = DateTime.Now, NumberOfTickets = 1, Status = "Booked" }
            };

            _mockBookingService.Setup(service => service.GetBookingsByUserIdAsync(userId))
                               .ReturnsAsync(bookings);

            // Act
            var result = await _controller.GetBookingsByUserId(userId);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(bookings, okResult.Value);
        }

        [Test]
        public async Task UpdateBooking_ShouldReturnNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            var username = "JohnDoe";
            var updateDto = new BookingUpdateDto
            {
                NumberOfTickets = 3,
                Showtime = DateTime.Now,
                Status = "Confirmed"
            };

            _mockBookingService.Setup(service => service.UpdateBookingAsync(username, updateDto))
                               .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateBooking(username, updateDto);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task UpdateBooking_ShouldReturnNotFound_WhenUpdateFails()
        {
            // Arrange
            var username = "NonExistentUser";
            var updateDto = new BookingUpdateDto
            {
                NumberOfTickets = 3,
                Showtime = DateTime.Now,
                Status = "Confirmed"
            };

            _mockBookingService.Setup(service => service.UpdateBookingAsync(username, updateDto))
                               .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateBooking(username, updateDto);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task CancelBooking_ShouldReturnNoContent_WhenCancellationIsSuccessful()
        {
            // Arrange
            var username = "JohnDoe";
            _mockBookingService.Setup(service => service.CancelBookingAsync(username))
                               .ReturnsAsync(true);

            // Act
            var result = await _controller.CancelBooking(username);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task CancelBooking_ShouldReturnNotFound_WhenCancellationFails()
        {
            // Arrange
            var username = "NonExistentUser";
            _mockBookingService.Setup(service => service.CancelBookingAsync(username))
                               .ReturnsAsync(false);

            // Act
            var result = await _controller.CancelBooking(username);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}

