using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrdersManagement.RespionseExceptions
{
    public class NotFoundException : BaseResponseException
    {
        public override int StatusCode { get; } = 404;

        public NotFoundException(Dictionary<string, string> errors) : base(errors)
        {
        }
    }
}
