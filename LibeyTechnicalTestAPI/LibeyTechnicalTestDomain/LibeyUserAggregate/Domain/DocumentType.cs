using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Domain
{
    public class DocumentType
    {
        [Key] // Clave primaria
        public int DocumentTypeId { get; set; }

        public string DocumentTypeDescription { get; set; } = string.Empty;
    }
}
