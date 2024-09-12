namespace MovieSerivices.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Director { get; set; }
        public string Language { get; set; }
        public decimal Rating { get; set; }
        public string ImageUrl {  get; set; }

        // Navigation property
        public ICollection<ShowTime> ShowTimes { get; set; }
    }
}
