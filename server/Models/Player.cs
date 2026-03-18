using System.ComponentModel.DataAnnotations;

namespace PerformanceApi.Models
{
    public class Player
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Position { get; set; } = string.Empty;
        public int PerformanceScore { get; set; } = 80;
        public bool IsAvailable { get; set; } = true;
        public int TeamId { get; set; }
    }
}
