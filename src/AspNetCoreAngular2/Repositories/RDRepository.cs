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
			var currentRow = _rds.FirstOrDefault(i => i.StaticClientGuid == regDesk.StaticClientGuid);
			if (currentRow != null)
			{
				// Get rid of any old info (we might have a new connectionId or something!)
				_rds.Remove(currentRow);
			}

			_rds.Add(regDesk);
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
