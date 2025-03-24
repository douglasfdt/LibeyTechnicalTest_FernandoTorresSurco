using LibeyTechnicalTestDomain.EFCore;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.DTO;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Infrastructure
{
    public class LibeyUserRepository : ILibeyUserRepository
    {
        private readonly Context _context;
        public LibeyUserRepository(Context context)
        {
            _context = context;
        }
        public void Create(LibeyUser LibeyUser)
        {
            _context.LibeyUser.Add(LibeyUser);
            _context.SaveChanges();
        }
        public LibeyUserResponse FindResponse(string documentNumber)
        {

            var q = from LibeyUser in _context.LibeyUser.Where(x => x.DocumentNumber.Trim() == documentNumber.Trim())
                    select new LibeyUserResponse()
                    {
                        DocumentNumber = LibeyUser.DocumentNumber,
                        Active = LibeyUser.Active,
                        Address = LibeyUser.Address,
                        DocumentTypeId = LibeyUser.DocumentTypeId,
                        Email = LibeyUser.Email,
                        FathersLastName = LibeyUser.FathersLastName,
                        MothersLastName = LibeyUser.MothersLastName,
                        Name = LibeyUser.Name,
                        Password = LibeyUser.Password,
                        Phone = LibeyUser.Phone,
                        UbigeoCode = LibeyUser.UbigeoCode
                    };
            var list = q.ToList();
            if (list.Any()) return list.First();
            else return new LibeyUserResponse();
        }
    }
}