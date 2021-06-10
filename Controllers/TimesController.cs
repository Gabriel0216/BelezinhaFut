using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BelezinhaFut.Models;

namespace BelezinhaFut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesController : ControllerBase
    {
        private readonly BelezinhaContext _context;

        public TimesController(BelezinhaContext context)
        {
            _context = context;
        }

        // GET: api/Times
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Time>>> GetTimes()
        {
            return await _context.Times.ToListAsync();
        }

        // GET: api/Times/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Time>> GetTime(long id)
        {
            var time = await _context.Times.FindAsync(id);

            if (time == null)
            {
                return NotFound();
            }

            return time;
        }

        // PUT: api/Times/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTime(long id, Time time)
        {
            if (id != time.Id)
            {
                return BadRequest();
            }

            _context.Entry(time).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Times
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Time>> PostTime(Time time)
        {
            _context.Times.Add(time);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTime), new { id = time.Id }, time);
            //return CreatedAtAction("GetTime", new { id = time.Id }, time);
        }

        // DELETE: api/Times/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Time>> DeleteTime(long id)
        {
            var time = await _context.Times.FindAsync(id);
            if (time == null)
            {
                return NotFound();
            }

            _context.Times.Remove(time);
            await _context.SaveChangesAsync();

            return time;
        }

        private bool TimeExists(long id)
        {
            return _context.Times.Any(e => e.Id == id);
        }
    }
}
