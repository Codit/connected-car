using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace Codit.ConnectedCar.API.Authorization
{
    public class ApiKeyAttribute : Attribute, IActionFilter
    {
        private readonly IOptions<ApiKeyConfig> apiConfig;

        public ApiKeyAttribute(IOptions<ApiKeyConfig> apiConfig)
        {
            this.apiConfig = apiConfig;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var apiKeyRequestHeader = context.HttpContext.Request.Headers["api-key"];
            if (apiKeyRequestHeader != apiConfig.Value.ApiKey)
            {
                context.Result = new StatusCodeResult((int)HttpStatusCode.Unauthorized);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}