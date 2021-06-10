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
    public class JogadoresController : ControllerBase
    {
        private readonly BelezinhaContext _context;

        public JogadoresController(BelezinhaContext context)
        {
            _context = context;
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogador>>> GetJogadores()
        {
            return await _context.Jogadores.ToListAsync();
        }

        // GET: api/Jogadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogador>> GetJogador(long id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // PUT: api/Jogadores/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogador(long id, Jogador jogador)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }

            _context.Entry(jogador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadorExists(id))
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

        // POST: api/Jogadores
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Jogador>> PostJogador(Jogador jogador)
        {
            _context.Jogadores.Add(jogador);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetJogador", new { id = jogador.Id }, jogador);
            return CreatedAtAction(nameof(GetJogador), new { id = jogador.Id }, jogador);
        }

        // DELETE: api/Jogadores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Jogador>> DeleteJogador(long id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);
            if (jogador == null)
            {
                return NotFound();
            }

            _context.Jogadores.Remove(jogador);
            await _context.SaveChangesAsync();

            return jogador;
        }

        private bool JogadorExists(long id)
        {
            return _context.Jogadores.Any(e => e.Id == id);
        }
    }
}
