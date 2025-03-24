using LibeyTechnicalTestDomain.EFCore;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Infrastructure
{
    public class LocationService : ILocationService
    {
        private readonly Context _context;

        public LocationService(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Region>> GetRegions()
        {
            return await _context.Regions.ToListAsync();
        }

        public async Task<IEnumerable<Province>> GetProvincesByRegion(string regionCode)
        {
            return await _context.Provinces
                                 .Where(p => p.RegionCode == regionCode)
                                 .ToListAsync();
        }
        public async Task<IEnumerable<Province>> GetAllProvinces()
        {
            return await _context.Provinces.ToListAsync();
        }

        public async Task<IEnumerable<Ubigeo>> GetUbigeosByProvince(string provinceCode)
        {
            return await _context.Ubigeos
                                 .Where(u => u.ProvinceCode == provinceCode)
                                 .ToListAsync();
        }
        public async Task<IEnumerable<Ubigeo>> GetAllUbigeos()
        {
            return await _context.Ubigeos.ToListAsync();
        }
    }
}
