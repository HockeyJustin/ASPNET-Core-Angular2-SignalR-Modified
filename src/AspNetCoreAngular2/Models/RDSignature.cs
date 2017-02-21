using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNETCoreAngular2Demo.Models
{
    public class RDSignature : RD
    {
		public string Signature { get; set; }

		/// <summary>
		/// This must match the signaturescreendetail value.
		/// </summary>
		public string UniqueStamp { get; set; }
	}
}
