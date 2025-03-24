using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Domain
{
    public class Region
    {
        [Key]
        public string RegionCode { get; set; } = string.Empty;
        public string RegionDescription { get; set; } = string.Empty;
    }

    public class Province
    {
        [Key]
        public string ProvinceCode { get; set; } = string.Empty;
        public string RegionCode { get; set; } = string.Empty;
        public string ProvinceDescription { get; set; } = string.Empty;
    }

    public class Ubigeo
    {
        [Key]
        public string UbigeoCode { get; set; } = string.Empty;
        public string ProvinceCode { get; set; } = string.Empty;
        public string RegionCode { get; set; } = string.Empty;
        public string UbigeoDescription { get; set; } = string.Empty;
    }
}
