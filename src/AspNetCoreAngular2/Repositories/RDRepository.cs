using ASPNETCoreAngular2Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNETCoreAngular2Demo.Repositories
{

	public interface IRDRepository
	{
		void Add(RD rd);
		void Remove(RD rd);
		RD Get(string rdUserName);
	}


	public class RDRepository : IRDRepository
	{
		public RDRepository()
		{

		}


		List<RD> _rds = new List<RD>();

		public void Add(RD regDesk)
		{
			// remove an existing entry for that client
			Remove(regDesk);

			_rds.Add(regDesk);
		}

		/// <summary>
		/// Uses the Unique id generated on the client to deregster
		/// </summary>
		/// <param name="regDesk"></param>
		public void Remove(RD regDesk)
		{
			var currentRow = _rds.FirstOrDefault(i => i.StaticClientGuid == regDesk.StaticClientGuid);
			if (currentRow != null)
			{
				_rds.Remove(currentRow);
			}
		}



		public RD Get(string regDeskUserName)
		{
			return _rds.FirstOrDefault(i => i.RDUserName.ToLower() == regDeskUserName.ToLower());
		}


		//private static RegDeskRepository _instance;
		//public static RegDeskRepository Instance()
		//{
		//	if (_instance == null)
		//	{
		//		_instance = new RegDeskRepository();
		//	}
		//	return _instance;
		//}

	}
}
