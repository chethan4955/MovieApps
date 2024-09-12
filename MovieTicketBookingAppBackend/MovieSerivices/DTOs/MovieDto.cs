namespace MovieSerivices.DTOs
{
    public class MovieDto
    {
        public int Id { get; set; }
        
        public string Title { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Director { get; set; }
        public decimal Rating { get; set; }
        public string ImageUrl {  get; set; }
        public IEnumerable<ShowTimeDto> ShowTimes { get; set; }
    }

    public class ShowTimeDto
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Location { get; set; }
    }
}
