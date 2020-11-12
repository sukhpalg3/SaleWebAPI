using Microsoft.EntityFrameworkCore;
using SaleWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaleWebAPI.Data
{
    public class SalesDBContext : DbContext
    {
        public SalesDBContext(DbContextOptions<SalesDBContext> options) : base(options)
        {

        }

        public DbSet<Sale> Sales { get; set; }
    }
}
