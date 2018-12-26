using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using OrdersManagement.Middlewares.ExceptionHandler.Models;
using OrdersManagement.RespionseExceptions;
using System;
using System.Threading.Tasks;

namespace OrdersManagement.Middlewares.ExceptionHandler
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private HttpContext _httpContext;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            _httpContext = context;
            try
            {
                await _next(context);
            }
            catch (BaseResponseException ex)
            {
                await WriteExceptionIntoContextResponse(ExceptionDescriptionModel.FromCustomException(ex));
            }
            catch (Exception ex)
            {
                await WriteExceptionIntoContextResponse(ExceptionDescriptionModel.FromCommonException(ex));
            }
        }

        private async Task WriteExceptionIntoContextResponse(ExceptionDescriptionModel exceptionDescription)
        {
            _httpContext.Response.StatusCode = exceptionDescription.StatusCode;
            _httpContext.Response.ContentType = "application/json";
            await _httpContext.Response.WriteAsync(JsonConvert.SerializeObject(exceptionDescription.ErrorDataDictionary));
        }
    }
}
