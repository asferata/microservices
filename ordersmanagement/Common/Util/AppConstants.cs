using System;

namespace Util
{
    public static class AppConstants
    {
        public const string DevelopmentEnvironmentValue = "development";
        public const string EnvironmentConfigPropertyName = "ASPNETCORE_ENVIRONMENT";
        public static class ConnectionStringNames
        {
            public const string Postgresql = "PostgresqlConnection";
        }
    }
}
