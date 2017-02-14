using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using ASPNETCoreAngular2Demo.Services;
using ASPNETCoreAngular2Demo.Hubs;
using ASPNETCoreAngular2Demo.Repositories;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPNETCoreAngular2Demo.Controller
{
	/// <summary>
	/// 0. set a name in the UI. This will be rdUserName.
	/// 1. using postman init signature http://localhost:5000/api/Signature?rdUserName=Reg1 post puts into signature mode, 
	/// 2. http://localhost:5000/api/Signature?rdUserName=Reg1 get will get the sig.
	/// use http://codebeautify.org/base64-to-image-converter# to see sig
	/// </summary>
	[Route("api/[controller]")]
	public class SignatureController : Microsoft.AspNetCore.Mvc.Controller
	{
		private readonly IHubContext _coolMessageHubContext;
		private IRDRepository _regdeskRepository;
		private IRDSignatureRepository _rdSignatureRepository;

		public SignatureController(IConnectionManager connectionManager, ITimerService timerService, IRDRepository regdeskRepository, IRDSignatureRepository rdSignatureRepository)
		{			
			_coolMessageHubContext = connectionManager.GetHubContext<CoolMessagesHub>();
			timerService.TimerElapsed += _timerService_TimerElapsed;
			_regdeskRepository = regdeskRepository;
			_rdSignatureRepository = rdSignatureRepository;
		}
		// GET: /<controller>/

		[HttpGet]
		public IActionResult GetLastSignature(string rdUserName)
        {
			if (String.IsNullOrWhiteSpace(rdUserName))
			{
				return BadRequest();
			}

			var matchingSignature = _rdSignatureRepository.Get(rdUserName);

			if (matchingSignature != null)
			{
				return Json(matchingSignature);
			}
			else
			{
				return Content("No signature yet.");
			}
		}


		[HttpPost]
		public IActionResult StartSignature(string rdUserName)
		{

			if (String.IsNullOrWhiteSpace(rdUserName))
			{
				return BadRequest();
			}

			var matchingDesk = _regdeskRepository.Get(rdUserName);

			if (matchingDesk != null)
			{
				_coolMessageHubContext.Clients.Client(matchingDesk.SignalRClientId)
					.StartSignatureCapture("GO!");
				return Content("OK");
			}
			else
			{
				return Content("No reg desk with that name. (username usually something like 'Reg Desk 1')");
			}

		}



		private void _timerService_TimerElapsed(object sender, EventArgs e)
		{
			TimerEventArgs eventsArgs = e as TimerEventArgs;
			_coolMessageHubContext.Clients.All.newCpuValue(eventsArgs.Value);
		}

	}
}
