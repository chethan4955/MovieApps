using Moq;

using Microsoft.AspNetCore.Mvc;
using MovieSerivices.Controllers;
using MovieSerivices.DTOs;
using MovieSerivices.Services;




namespace MovieAppTesting
{



    [TestFixture]
    public class MoviesControllerTests
    {
        private Mock<MoviesService> _moviesServiceMock;
        private MoviesController _controller;

        [SetUp]
        public void Setup()
        {
            _moviesServiceMock = new Mock<MoviesService>(null);
            _controller = new MoviesController(_moviesServiceMock.Object);
        }

        [Test]
        public async Task GetMovies_ReturnsOkResultWithMovies()
        {
            // Arrange
            var filter = new MovieFilterDto();
            _moviesServiceMock.Setup(service => service.GetMoviesAsync(filter))
                .ReturnsAsync(new List<MovieDto>());

            // Act
            var result = await _controller.GetMovies(filter);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetMovieById_ReturnsOkResultWithMovie()
        {
            // Arrange
            var movieId = 1;
            var movieDto = new MovieDto { Id = movieId, Title = "Movie 1" };
            _moviesServiceMock.Setup(service => service.GetMovieByIdAsync(movieId))
                .ReturnsAsync(movieDto);

            // Act
            var result = await _controller.GetMovieById(movieId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(movieDto, okResult.Value);
        }

        [Test]
        public async Task GetMovieById_ReturnsNotFoundResult()
        {
            // Arrange
            var movieId = 1;
            _moviesServiceMock.Setup(service => service.GetMovieByIdAsync(movieId))
                .ReturnsAsync((MovieDto)null);

            // Act
            var result = await _controller.GetMovieById(movieId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task AddMovie_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var createMovieDto = new CreateMovieDto { Title = "Movie 1" };
            var movieDto = new MovieDto { Id = 1, Title = "Movie 1" };
            _moviesServiceMock.Setup(service => service.AddMovieAsync(createMovieDto))
                .ReturnsAsync(movieDto);

            // Act
            var result = await _controller.AddMovie(createMovieDto);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.AreEqual(movieDto, createdAtActionResult.Value);
            Assert.AreEqual("GetMovieById", createdAtActionResult.ActionName);
        }

        [Test]
        public async Task UpdateMovie_ReturnsNoContentResult()
        {
            // Arrange
            var movieId = 1;
            var updateDto = new MovieUpdateDto { Title = "Updated Movie 1" };
            _moviesServiceMock.Setup(service => service.UpdateMovieAsync(movieId, updateDto))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateMovie(movieId, updateDto);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task UpdateMovie_ReturnsNotFoundResult()
        {
            // Arrange
            var movieId = 1;
            var updateDto = new MovieUpdateDto { Title = "Updated Movie 1" };
            _moviesServiceMock.Setup(service => service.UpdateMovieAsync(movieId, updateDto))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateMovie(movieId, updateDto);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }
    }

}

