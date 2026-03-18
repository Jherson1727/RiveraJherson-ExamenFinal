using Microsoft.EntityFrameworkCore;
using PerformanceApi.Models;

namespace PerformanceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Player> Players => Set<Player>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<Staff> StaffMembers => Set<Staff>();
    }
}