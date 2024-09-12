using System.ComponentModel.DataAnnotations;

namespace AuthMicroservice.Models
{
    public class UserLogin
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
