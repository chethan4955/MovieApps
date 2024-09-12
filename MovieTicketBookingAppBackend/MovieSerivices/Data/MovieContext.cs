
using Microsoft.EntityFrameworkCore;
using MovieSerivices.Models;

namespace MovieSerivices.Data
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<ShowTime> ShowTimes { get; set; }

       

       
    }
}
