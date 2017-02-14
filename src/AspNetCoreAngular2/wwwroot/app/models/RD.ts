import { RDBase } from '../models/RDBase';

export class RD extends RDBase {
	// the name the user puts in
	public RDUserName: string;

	constructor(rdUserName: string, signalRClientId: string, staticClientGuid: any) {
		super(signalRClientId, staticClientGuid);

		this.RDUserName = rdUserName;		
	}

}