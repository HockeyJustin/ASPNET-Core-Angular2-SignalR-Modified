import { RD } from '../models/RD';

export class RDSignature extends RD {

	public Signature: string;
	public UniqueStamp: string;

	constructor(rdUserName: string, signalRClientId: string, staticClientGuid: any, signature: string, uniqueStamp: string) {
		super(rdUserName, signalRClientId, staticClientGuid);

		this.Signature = signature;
		this.UniqueStamp = uniqueStamp;
	}

}