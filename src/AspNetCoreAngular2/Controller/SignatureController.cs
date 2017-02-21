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
using ASPNETCoreAngular2Demo.Models;

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
		private IRDRepository _rdRepository;
		private IRDSignatureRepository _rdSignatureRepository;

		public SignatureController(IConnectionManager connectionManager, ITimerService timerService, IRDRepository regdeskRepository, IRDSignatureRepository rdSignatureRepository)
		{			
			_coolMessageHubContext = connectionManager.GetHubContext<CoolMessagesHub>();
			timerService.TimerElapsed += _timerService_TimerElapsed;
			_rdRepository = regdeskRepository;
			_rdSignatureRepository = rdSignatureRepository;
		}
		// GET: /<controller>/

		[HttpGet]
		public IActionResult GetLastSignature(string rdUserName, string uniqueStamp)
        {
			if (String.IsNullOrWhiteSpace(rdUserName))
			{
				return BadRequest();
			}

			Models.RDSignature matchingSignature = _rdSignatureRepository.Get(rdUserName, uniqueStamp);

			if (matchingSignature != null && !String.IsNullOrWhiteSpace(matchingSignature.Signature))
			{
				return Json(matchingSignature);
			}
			else if(matchingSignature != null && String.IsNullOrWhiteSpace(matchingSignature.Signature))
			{
				return Content("No signature yet.");
			}
			else
			{
				return Content("RD not recognised or no signature created yet.");
			}
		}


		[HttpPost]
		public IActionResult StartSignature([FromBody] SignatureRequestDetail signatureDetail)
		{

			if (signatureDetail == null || String.IsNullOrWhiteSpace(signatureDetail.RdUserName))
			{
				return BadRequest();
			}

			var matchingDesk = _rdRepository.Get(signatureDetail.RdUserName);

			if (matchingDesk != null)
			{
				_rdSignatureRepository.ClearSignature(signatureDetail.RdUserName);
				// check / clean data?
				_coolMessageHubContext.Clients.Client(matchingDesk.SignalRClientId)
					.StartSignatureCapture(signatureDetail);
				return Json("OK");
			}
			else
			{
				return Json("No sig pad with that name. (username usually something like 'Reggie1')");
			}

		}


		private void _timerService_TimerElapsed(object sender, EventArgs e)
		{
			TimerEventArgs eventsArgs = e as TimerEventArgs;
			_coolMessageHubContext.Clients.All.newCpuValue(eventsArgs.Value);
		}

	}
}
