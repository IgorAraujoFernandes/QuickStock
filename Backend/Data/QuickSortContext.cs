using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

namespace BackEnd.Data
{
    public class QuickSortContext : DbContext
    {
        public QuickSortContext()
        {
        }

        public QuickSortContext(DbContextOptions<QuickSortContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
