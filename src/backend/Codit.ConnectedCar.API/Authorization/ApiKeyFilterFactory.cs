using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace Codit.ConnectedCar.API.Authorization
{
    public class ApiKeyFilterFactory : IFilterFactory
    {
        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var context = (IOptions<ApiKeyConfig>)serviceProvider.GetService(typeof(IOptions<ApiKeyConfig>));
            return new ApiKeyAttribute(context);
        }

        public bool IsReusable => true;
    }
}