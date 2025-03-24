using LibeyTechnicalTestDomain.EFCore;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibeyTechnicalTestDomain.LocationAggregate.Infrastructure
{
    public class DocumentTypeService : IDocumentTypeService
    {
        private readonly Context _context;

        public DocumentTypeService(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DocumentType>> GetDocumentTypes()
        {
            return await _context.DocumentTypes.ToListAsync();
        }
    }
}
