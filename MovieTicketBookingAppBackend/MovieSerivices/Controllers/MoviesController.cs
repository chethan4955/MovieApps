using Microsoft.AspNetCore.Mvc;
using MovieSerivices.DTOs;
using MovieSerivices.Services;

namespace MovieSerivices.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesService _movieService;

        public MoviesController(MoviesService movieService)
        {
            _movieService = movieService;
        }
        // GET /movies/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllMovies()
        {
            // Create a filter with no criteria to get all movies
            var filter = new MovieFilterDto();
            var movies = await _movieService.GetMoviesAsync(filter);
            return Ok(movies);
        }


        // GET /movies
        [HttpGet]
        public async Task<IActionResult> GetMovies([FromQuery] MovieFilterDto filter)
        {
            var movies = await _movieService.GetMoviesAsync(filter);
            return Ok(movies);
        }

        // GET /movies/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // GET /movies/search
        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] MovieFilterDto filter)
        {
            var movies = await _movieService.GetMoviesAsync(filter);
            return Ok(movies);
        }

        // POST /movies
        [HttpPost]
        /*[Authorize(Roles = "Admin")]*/ // Only admins can add movies
        public async Task<IActionResult> AddMovie([FromBody] CreateMovieDto createMovieDto)
        {
            var movie = await _movieService.AddMovieAsync(createMovieDto);
            return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);
        }

        // PUT /api/movies/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] MovieUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _movieService.UpdateMovieAsync(id, updateDto);

            if (!result)
            {
                return NotFound("Movie not found");
            }

            return NoContent(); // Return 204 No Content if the update was successful
        }

        // DELETE /api/movies/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var result = await _movieService.DeleteMovieAsync(id);

            if (!result)
            {
                return NotFound("Movie not found");
            }

            return NoContent(); // Return 204 No Content if the deletion was successful
        }

    }
}
