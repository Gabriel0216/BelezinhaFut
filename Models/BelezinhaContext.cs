using Microsoft.EntityFrameworkCore;

namespace BelezinhaFut.Models
{
    public class BelezinhaContext : DbContext
    {
        public BelezinhaContext(DbContextOptions<BelezinhaContext> options)
            : base(options)
        {
        }

        public DbSet<Time> Times {get; set;}
        public DbSet<Jogador> Jogadores {get; set;}
    }
}