using System.Threading.Tasks;
using ASPNETCoreAngular2Demo.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using ASPNETCoreAngular2Demo.Repositories;

namespace ASPNETCoreAngular2Demo.Hubs
{
	[HubName("coolmessages")]
	public class CoolMessagesHub : Hub
	{
		private IRDRepository _regdeskRepository;
		private IRDSignatureRepository _regdeskSignatureRepository;

		public CoolMessagesHub(IRDRepository regdeskRepository, IRDSignatureRepository regdeskSignatureRepository)
		{
			_regdeskRepository = regdeskRepository;
			_regdeskSignatureRepository = regdeskSignatureRepository;
		}


		//https://www.asp.net/signalr/overview/guide-to-the-api/mapping-users-to-connections#inmemory
		//http://stackoverflow.com/questions/19522103/signalr-sending-a-message-to-a-specific-user-using-iuseridprovider-new-2-0
		public void SendMessage(string who, ChatMessage chatMessage)
		{
			// send to all
			Clients.All.SendMessage(chatMessage);
			// only send back to the sender.
			//Clients.Client(who).SendMessage(chatMessage);
		}


		/// <summary>
		/// The client ID as provided on connection.
		/// </summary>
		/// <param name="clientStaticUniqueIdentifier">This is set on the client and will not change (unlike the clientId created by SignalR)</param>
		/// <param name="clientId"></param>
		/// <param name="registrationDeskId"></param>
		public void SendRegistrationId(RD regDesk)
		{
			_regdeskRepository.Add(regDesk);

			Clients.Client(regDesk.SignalRClientId).RegistrationSuccessOrFail("success");
		}

		public void DeRegister(RD regDesk)
		{
			_regdeskRepository.Remove(regDesk);
			Clients.Client(regDesk.SignalRClientId).DeRegistrationSuccessOrFail("success");
		}


		public void SaveSignature(RDSignature regDeskSignature)
		{
			_regdeskSignatureRepository.Add(regDeskSignature);

			Clients.Client(regDeskSignature.SignalRClientId).SaveSignatureSuccessOrFail("success");
		}


		public override Task OnConnected()
		{
			return base.OnConnected();
		}
	}






}
