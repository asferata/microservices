using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrdersManagement.RespionseExceptions
{
    public class BaseResponseException : Exception
    {
        public virtual int StatusCode { get; }
        public Dictionary<string, string> ErrorData { get; } = new Dictionary<string, string>();
        public string InternalMessage { set; get; }

        protected BaseResponseException(string message) : base(message) { }

        public BaseResponseException(Dictionary<string, string> errors) : base("Error")
        {
            ErrorData = errors;
        }
    }
}
