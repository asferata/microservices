using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Util.Exceptions
{
    public class NoDataException:ServiceException
    {
        public NoDataException(params (string errorCode, string message)[] errors) : base(errors)
        {
        }
    }
}
