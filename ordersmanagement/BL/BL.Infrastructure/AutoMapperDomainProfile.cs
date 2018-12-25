using AutoMapper;
using BL.DtoModels.Orders;
using DL.Entities;

namespace BL.Infrastructure
{
    public class AutoMapperDomainProfile: Profile
    {
        public AutoMapperDomainProfile()
        {
            CreateMap<Order, OrderDto>();
        }
    }
}
