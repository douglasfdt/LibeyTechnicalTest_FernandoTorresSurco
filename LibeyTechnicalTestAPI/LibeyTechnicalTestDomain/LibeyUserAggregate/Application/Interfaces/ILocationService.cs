using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<Region>> GetRegions();
        Task<IEnumerable<Province>> GetProvincesByRegion(string regionCode);
        Task<IEnumerable<Province>> GetAllProvinces();
        Task<IEnumerable<Ubigeo>> GetUbigeosByProvince(string provinceCode);
        Task<IEnumerable<Ubigeo>> GetAllUbigeos();
    }
}
