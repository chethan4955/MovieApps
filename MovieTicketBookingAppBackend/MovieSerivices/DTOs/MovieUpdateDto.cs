namespace MovieSerivices.DTOs
{
    public class MovieUpdateDto
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Location { get; set; }
        public decimal Rating { get; set; }
    }
}
