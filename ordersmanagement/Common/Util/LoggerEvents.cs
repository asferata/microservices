using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;

namespace Util
{
    public static class LoggerEvents
    {
        public static EventId LoadOrderById => new EventId(0, nameof(LoadOrderById));
    }
}
