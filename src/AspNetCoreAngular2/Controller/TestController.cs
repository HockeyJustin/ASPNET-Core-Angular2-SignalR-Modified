using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPNETCoreAngular2Demo.Controller
{

	[Route("api/[controller]")]
	public class TestController : Microsoft.AspNetCore.Mvc.Controller
	{
        // GET: /<controller>/
        public string Index()
        {
            return "Hello";
        }
    }
}
