using BookingService.Models;
using MongoDB.Driver;

namespace BookingService.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration config)
        {
            var client = new MongoClient(config.GetSection("MongoDB:ConnectionString").Value);
            _database = client.GetDatabase(config.GetSection("MongoDB:DatabaseName").Value);
        }

        public IMongoCollection<Booking> Bookings => _database.GetCollection<Booking>("Bookings");
    }
}
