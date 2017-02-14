import { RD } from '../models/RD';

export class RDSignature extends RD {

	public Signature: string;


	constructor(rdUserName: string, signalRClientId: string, staticClientGuid: any, signature: string) {
		super(rdUserName, signalRClientId, staticClientGuid);

		this.Signature = signature;
	}

}