using Microsoft.EntityFrameworkCore;
using AuthMicroservice.Models;

namespace AuthMicroservice.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        // Add any additional DbSet properties for other models here
    }
}
