using System.ComponentModel.DataAnnotations;

namespace PerformanceApi.Models
{
    public class Team
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string City { get; set; } = string.Empty;
        public List<Player> Players { get; set; } = new();
    }
}
