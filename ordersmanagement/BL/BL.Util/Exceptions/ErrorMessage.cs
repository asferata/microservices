using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Util.Exceptions
{
    public static class ErrorMessage
    {
        public static (string Name, string Desciption) OrderNotFound(long orderId) =>
            ($"Order {orderId}", $"Order not found");
    }
}
