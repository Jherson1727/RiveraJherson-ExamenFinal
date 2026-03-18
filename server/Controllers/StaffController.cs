using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PerformanceApi.Data;
using PerformanceApi.Models;

namespace PerformanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaff()
            => await _context.StaffMembers.ToListAsync();

        [HttpPost]
        public async Task<ActionResult<Staff>> CreateStaff(Staff staff)
        {
            _context.StaffMembers.Add(staff);
            await _context.SaveChangesAsync();
            return StatusCode(201, staff);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.StaffMembers.FindAsync(id);
            if (staff == null) return NotFound();
            _context.StaffMembers.Remove(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
