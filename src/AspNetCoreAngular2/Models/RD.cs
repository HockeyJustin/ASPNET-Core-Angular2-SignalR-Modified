using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNETCoreAngular2Demo.Models
{
	public class RD
	{
		public string RDUserName;

		// the id created by signalR on connect.
		public string SignalRClientId;

		// *** An ID generated on the client that, unlike the SignalR client ID, 
		// *** will not change on reconnect.***
		public Guid StaticClientGuid;
	}
}
