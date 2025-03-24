using LibeyTechnicalTestDomain.EFCore.Configuration;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using Microsoft.EntityFrameworkCore;
namespace LibeyTechnicalTestDomain.EFCore
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<LibeyUser> LibeyUser { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Ubigeo> Ubigeos { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LibeyUser>().ToTable("LibeyUser", schema: "dbo");

            modelBuilder.ApplyConfiguration(new LibeyUserConfiguration());

            modelBuilder.Entity<Region>()
          .ToTable("Region")  
          .HasKey(r => r.RegionCode);

           modelBuilder.Entity<Province>()
          .ToTable("Province") 
          .HasKey(p => p.ProvinceCode);

           modelBuilder.Entity<Ubigeo>()
           .ToTable("Ubigeo") 
           .HasKey(u => u.UbigeoCode);

           modelBuilder.Entity<DocumentType>()
           .ToTable("DocumentType") 
           .HasKey(d => d.DocumentTypeId);
        }
    }
}