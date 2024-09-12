namespace MovieSerivices.Models
{
    public class ShowTime
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Location { get; set; }
        public int MovieId { get; set; }

        // Navigation property
        public Movie Movie { get; set; }
    }
}
