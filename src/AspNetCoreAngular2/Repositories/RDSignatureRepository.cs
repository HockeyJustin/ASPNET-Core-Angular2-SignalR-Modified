using ASPNETCoreAngular2Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNETCoreAngular2Demo.Repositories
{
	public interface IRDSignatureRepository
	{
		void Add(RDSignature regDesk);
		RDSignature Get(string rdUserName, string uniqueStamp);
		void ClearSignature(string rdUserName);
	}


	public class RDSignatureRepository : IRDSignatureRepository
	{
		List<RDSignature> _regDesks = new List<RDSignature>();


		public void Add(RDSignature regDesk)
		{
			var currentListing = _regDesks.FirstOrDefault(i => i.StaticClientGuid == regDesk.StaticClientGuid);

			if (currentListing != null)
			{
				_regDesks.Remove(currentListing);

			}

			_regDesks.Add(regDesk);

		}

		public RDSignature Get(string rdUserName, string uniqueStamp)
		{
			return _regDesks.FirstOrDefault(i => i.RDUserName.ToLower() == rdUserName.ToLower() && i.UniqueStamp == uniqueStamp);
		}

		public void ClearSignature(string rdUserName)
		{
			var thisSignature = _regDesks.FirstOrDefault(i => i.RDUserName.ToLower() == rdUserName.ToLower());
			if (thisSignature != null)
			{
				thisSignature.Signature = "";
				thisSignature.UniqueStamp = "";
			}
		}


		//private static RegDeskSignatureRepository _instance;
		//public static RegDeskSignatureRepository Instance()
		//{
		//	if (_instance == null)
		//	{
		//		_instance = new RegDeskSignatureRepository();
		//	}
		//	return _instance;
		//}


	}
}
