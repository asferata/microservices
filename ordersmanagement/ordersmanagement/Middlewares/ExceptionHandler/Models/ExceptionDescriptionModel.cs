using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using OrdersManagement.RespionseExceptions;

namespace OrdersManagement.Middlewares.ExceptionHandler.Models
{
    public class ExceptionDescriptionModel
    {
        [JsonIgnore]
        public int StatusCode { set; get; }
        public Dictionary<string, string> ErrorDataDictionary { set; get; }

        private ExceptionDescriptionModel() { }

        public static ExceptionDescriptionModel FromCustomException(BaseResponseException exception)
        {
            return new ExceptionDescriptionModel
            {
                StatusCode = exception.StatusCode,
                ErrorDataDictionary = exception.ErrorData
            };
        }

        public static ExceptionDescriptionModel FromCommonException(Exception ex)
        {
            var a = new ExceptionDescriptionModel
            {
                StatusCode = 500,
                ErrorDataDictionary = new Dictionary<string, string> { { ex.Message, ex.StackTrace } }
            };
            return a;
        }
    }
}
