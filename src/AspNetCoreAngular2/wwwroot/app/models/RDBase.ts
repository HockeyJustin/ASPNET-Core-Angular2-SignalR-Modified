export class RDBase {

	// the id created by signalR on connect.
	public SignalRClientId: string;

	// An ID generated on the client that, unlike the SignalR client ID, 
	// will not change on reconnect.
	public StaticClientGuid: any;

	constructor(signalRClientId: string, staticClientGuid: any) {
		this.SignalRClientId = signalRClientId;
		this.StaticClientGuid = staticClientGuid;
	}

}