namespace MovieSerivices.DTOs
{
    public class CreateMovieDto
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Director { get; set; }
        public string Language { get; set; }
        public decimal Rating { get; set; }
        public string ImageUrl {  get; set; }
        public ICollection<CreateShowTimeDto> ShowTimes { get; set; }
    }




    public class CreateShowTimeDto
    {
        public DateTime Time { get; set; }
        public string Location { get; set; }
    }
}


public class CreateShowTimeDto
    {
        public DateTime Time { get; set; }
        public string Location { get; set; }
    }

