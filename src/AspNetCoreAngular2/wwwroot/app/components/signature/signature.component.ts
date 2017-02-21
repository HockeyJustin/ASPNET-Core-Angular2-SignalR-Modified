import { Component, NgZone, ViewChild } from '@angular/core';
import { SignalRService } from '../../services/signalRService';
import { RD } from '../../models/RD';
import { RDSignature } from '../../models/RDSignature';
import { Guid } from '../../models/Guid';
import { SignaturePadComponent } from '../../components/signature-pad/signaturepad.component';
import { SignatureRequestDetail } from '../../models/SignatureRequestDetail';

@Component({
	selector: 'signature',
	templateUrl: './signature.component.html'
})


export class SignatureComponent {

	public rd: RD;
	public signatureRequest: SignatureRequestDetail;

	public canSendMessage: Boolean;
	private isRegistered: Boolean;
	private isSignatureCaptureStarted: Boolean;
	public signature: string;



	@ViewChild(SignaturePadComponent)
	private signaturePad: SignaturePadComponent;


	constructor(private _signalRService: SignalRService, private _ngZone: NgZone) {
		this.subscribeToEvents();
		this.isRegistered = false;

		// warning: This means only 1 desk per browser unless incognito!
		var staticClientId = localStorage.getItem('staticKey');
		if (!staticClientId) {
			staticClientId = Guid.newGuid();
			localStorage.setItem('staticKey', staticClientId);
		}


		this.rd = new RD('', '', staticClientId);
		this.canSendMessage = _signalRService.connectionExists;
	}

	// Event from SignaturePadComponent
	onSignatureComplete(signatureString: string) {
		this.signature = signatureString;
	}


	public sendRegistration() {
		if (this.canSendMessage) {
			this._signalRService.sendRegistrationId(this.rd);
		}
	}

	public clearSignature(): void {
		this._ngZone.run(() => {
			this.signature = '';
			if (this.signaturePad != null) {
				this.signaturePad.clearSignature();
			}			
		});
	}

	public clearSignatureRequest(): void {
		this.signatureRequest = new SignatureRequestDetail();
	}

	public saveSignature(): void {
		if (this.canSendMessage && this.isSignatureCaptureStarted) {
			var rdSig = new RDSignature(this.rd.RDUserName, this.rd.SignalRClientId, this.rd.StaticClientGuid, this.signature, this.signatureRequest.UniqueStamp);
			this._signalRService.saveSignature(rdSig);
		}
	}


	private subscribeToEvents(): void {
		this._signalRService.connectionEstablished.subscribe(() => {
			this.canSendMessage = true;
			this.rd.SignalRClientId = this._signalRService.connectionId;
		});

		this._signalRService.successFailMessage.subscribe((message: string) => {
			this._ngZone.run(() => {
				if (message === 'success') {
					this.isRegistered = true;
				} else {
					this.isRegistered = false;
				}
			});
		});

		this._signalRService.saveSignatureSuccessOrFailMessage.subscribe((message: string) => {
			this._ngZone.run(() => {
				if (message === 'success') {
					this.clearSignature();
					this.isSignatureCaptureStarted = false;
				} else {
					this.signature = 'error!';
				}
			});
		});


		this._signalRService.startSignatureCaptureMessage.subscribe((sigRequest: SignatureRequestDetail) => {
			this._ngZone.run(() => {
				this.clearSignature();
				this.isSignatureCaptureStarted = true;
				this.signatureRequest = sigRequest;
			});
		});
	}

}

