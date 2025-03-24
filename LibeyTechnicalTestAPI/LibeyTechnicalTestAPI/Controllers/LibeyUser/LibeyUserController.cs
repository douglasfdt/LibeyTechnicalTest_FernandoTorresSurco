using LibeyTechnicalTestDomain.EFCore;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.DTO;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Infrastructure;
using LibeyTechnicalTestDomain.LocationAggregate.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace LibeyTechnicalTestAPI.Controllers.LibeyUser
{
    [ApiController]
    [Route("[controller]")]
    public class LibeyUserController : Controller
    {
        private readonly ILibeyUserAggregate _aggregate;
        private readonly Context _context;
        private readonly ILocationService _locationService;
        private readonly IDocumentTypeService _documentTypeService;


        public LibeyUserController(ILibeyUserAggregate aggregate, Context context, ILocationService locationService, IDocumentTypeService documentTypeService)
        {
            _aggregate = aggregate;
            _context = context;
            _locationService = locationService;
            _documentTypeService = documentTypeService;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibeyTechnicalTestDomain.LibeyUserAggregate.Domain.LibeyUser>>> GetUsers()
        {
            return await _context.LibeyUser.ToListAsync();
        }
        [HttpGet]
        [Route("{documentNumber}")]
        public IActionResult FindResponse(string documentNumber)
        {
            var row = _aggregate.FindResponse(documentNumber);
            return Ok(row);
        }
        [HttpPost]       
        public IActionResult Create(UserUpdateorCreateCommand command)
        {
             _aggregate.Create(command);
            return Ok(true);
        }

        [HttpPut("{documentNumber}")]
        public async Task<IActionResult> UpdateUser(string documentNumber, LibeyTechnicalTestDomain.LibeyUserAggregate.Domain.LibeyUser user)
        {
            if (documentNumber != user.DocumentNumber)
                return BadRequest("El número de documento no coincide.");

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(documentNumber))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{documentNumber}")]
        public async Task<IActionResult> DeleteUser(string documentNumber)
        {
            var user = await _context.LibeyUser.FindAsync(documentNumber);
            if (user == null) return NotFound();

            _context.LibeyUser.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string documentNumber)
        {
            return _context.LibeyUser.Any(e => e.DocumentNumber == documentNumber);
        }

        [HttpGet("regions")]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegions()
        {
            return Ok(await _locationService.GetRegions());
        }

        [HttpGet("provinces/{regionCode?}")]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvincesByRegion([FromRoute] string? regionCode)
        {
            var provinces = string.IsNullOrEmpty(regionCode)
                ? await _locationService.GetAllProvinces()
                : await _locationService.GetProvincesByRegion(regionCode);

            return Ok(provinces);
        }

        [HttpGet("ubigeos/{provinceCode?}")]
        public async Task<ActionResult<IEnumerable<Ubigeo>>> GetUbigeosByProvince([FromRoute] string? provinceCode)
        {
            var ubigeos = string.IsNullOrEmpty(provinceCode)
                ? await _locationService.GetAllUbigeos() 
                : await _locationService.GetUbigeosByProvince(provinceCode);

            return Ok(ubigeos);
        }
        [HttpGet("document-types")] 
        public async Task<ActionResult<IEnumerable<DocumentType>>> GetDocumentTypes()
        {
            return await _context.DocumentTypes.ToListAsync();
        }
    }
}
