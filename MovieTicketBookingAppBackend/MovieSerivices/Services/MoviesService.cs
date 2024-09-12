
using Microsoft.EntityFrameworkCore;
using MovieSerivices.Data;
using MovieSerivices.DTOs;
using MovieSerivices.Models;
namespace MovieSerivices.Services
{

    public class MoviesService
    {
        private readonly MovieContext _context;

        public MoviesService(MovieContext context)
        {
            _context = context;
        }

        public virtual async Task<IEnumerable<MovieDto>> GetMoviesAsync(MovieFilterDto filter)
        {
            var query = _context.Movies.Include(m => m.ShowTimes).AsQueryable();

            if (!string.IsNullOrEmpty(filter.Genre))
            {
                query = query.Where(m => m.Genre == filter.Genre);
            }

            if (filter.Date.HasValue)
            {
                query = query.Where(m => m.ShowTimes.Any(st => st.Time.Date == filter.Date.Value.Date));
            }

            if (!string.IsNullOrEmpty(filter.Location))
            {
                query = query.Where(m => m.ShowTimes.Any(st => st.Location == filter.Location));
            }

            var movies = await query.ToListAsync();

            return movies.Select(m => new MovieDto
            {
                Id = m.Id,
                Title = m.Title,
                Genre = m.Genre,
                ReleaseDate = m.ReleaseDate,
                Director = m.Director,
                Rating = m.Rating,
                ImageUrl = m.ImageUrl,
                ShowTimes = m.ShowTimes.Select(st => new ShowTimeDto
                {
                    Id = st.Id,
                    Time = st.Time,
                    Location = st.Location
                })
            });
        }
        public virtual async Task<bool> UpdateMovieAsync(int id, MovieUpdateDto updateDto)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return false; // Movie not found
            }

            // Update movie properties
            movie.Title = updateDto.Title;
            movie.Genre = updateDto.Genre;
            movie.ReleaseDate = updateDto.ReleaseDate;
            movie.Rating = updateDto.Rating;

            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();

            return true;
        }

        public virtual async Task<MovieDto> GetMovieByIdAsync(int id)
        {
            var movie = await _context.Movies.Include(m => m.ShowTimes)
                                              .SingleOrDefaultAsync(m => m.Id == id);

            if (movie == null)
            {
                return null;
            }

            return new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Genre = movie.Genre,
                ReleaseDate = movie.ReleaseDate,
                ImageUrl=movie.ImageUrl,
                Director = movie.Director,
                Rating = movie.Rating,
                ShowTimes = movie.ShowTimes.Select(st => new ShowTimeDto
                {
                    Id = st.Id,
                    Time = st.Time,
                    Location = st.Location
                })
            };
        }

        public virtual async Task<MovieDto> AddMovieAsync(CreateMovieDto createMovieDto)
        {
            var movie = new Movie
            {
                Title = createMovieDto.Title,
                Genre = createMovieDto.Genre,
                Description = createMovieDto.Description,
                ReleaseDate = createMovieDto.ReleaseDate,
                Director = createMovieDto.Director,
                Language = createMovieDto.Language,
                Rating = createMovieDto.Rating,
                ImageUrl=createMovieDto.ImageUrl,
                ShowTimes = createMovieDto.ShowTimes.Select(st => new ShowTime
                {
                    Time = st.Time,
                    Location = st.Location
                }).ToList()
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Genre = movie.Genre,
                ReleaseDate = movie.ReleaseDate,
                Director = movie.Director,
                Rating = movie.Rating,
               ImageUrl = movie.ImageUrl,
               



                ShowTimes = movie.ShowTimes.Select(st => new ShowTimeDto
                {
                    Id = st.Id,
                    Time = st.Time,
                    Location = st.Location
                }).ToList()
            };


        }

        public async Task<int> GetMovieCountAsync()
        {
            return await _context.Movies.CountAsync();
        }
        public async Task<bool> DeleteMovieAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return false; // Movie not found
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return true; // Successfully deleted
        }
    }
}