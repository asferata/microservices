using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Util.Exceptions
{
    public class ServiceException : Exception
    {
        public Dictionary<string, string> Errors { set; get; } = new Dictionary<string, string>();

        protected ServiceException(string message) : base(message) { }

        protected ServiceException(params (string errorCode, string message)[] errors)
        {
            foreach (var error in errors)
            {
                Errors.Add(error.errorCode, error.message);
            }
        }

        public static Exception FromNonServiceException((string errorCode, string message) error)
        {
            return new Exception($"{error.errorCode}: {error.message}");
        }
    }
}
