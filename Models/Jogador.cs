namespace BelezinhaFut.Models
{
    public class Jogador
    {
        public long Id {get; set;}
        public string Nome {get; set;}
        public int Idade {get; set;}
        public float Altura {get; set;}
        public float Peso {get; set;}
        public int Num_partidas {get; set;}
        public int Num_gols {get; set;}
        public string Descricao {get; set;}
        public int Idtime {get; set;}
        public Time Time {get; set;}

    }
}