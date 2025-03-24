using LibeyTechnicalTestDomain.EFCore;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.DTO;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;

namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Infrastructure
{
    public class LibeyUserAggregateService : ILibeyUserAggregate
    {
        private readonly Context _context;

        public LibeyUserAggregateService(Context context)
        {
            _context = context;
        }

        public LibeyUserResponse FindResponse(string documentNumber)
        {
            var user = _context.LibeyUser
                .Where(x => x.DocumentNumber == documentNumber)
                .Select(x => new LibeyUserResponse
                {
                    DocumentNumber = x.DocumentNumber,
                    Active = x.Active,
                    Address = x.Address,
                    DocumentTypeId = x.DocumentTypeId,
                    Email = x.Email,
                    FathersLastName = x.FathersLastName,
                    MothersLastName = x.MothersLastName,
                    Name = x.Name,
                    Password = x.Password,
                    Phone = x.Phone,
                    UbigeoCode=x.UbigeoCode
                })
                .FirstOrDefault();

            return user ?? new LibeyUserResponse();
        }

        public void Create(UserUpdateorCreateCommand command)
        {
            var newUser = new LibeyUser(
                command.DocumentNumber,
                command.DocumentTypeId,
                command.Name,
                command.FathersLastName,
                command.MothersLastName,
                command.Address,
                command.UbigeoCode,
                command.Phone,
                command.Email,
                command.Password
            );

            _context.LibeyUser.Add(newUser);
            _context.SaveChanges();
        }
    }
}
