using System.ComponentModel.DataAnnotations;

namespace PerformanceApi.Models
{
    public class Staff
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Role { get; set; } = string.Empty;
        public int TeamId { get; set; }
    }
}
