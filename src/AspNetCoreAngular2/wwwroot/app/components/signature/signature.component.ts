import { Component, NgZone, ViewChild } from '@angular/core';
import { SignalRService } from '../../services/signalRService';
import { RD } from '../../models/RD';
import { RDSignature } from '../../models/RDSignature';
import { Guid } from '../../models/Guid';
import { SignaturePadComponent } from '../../components/signature-pad/signaturepad.component';
import { SignatureScreenDetail } from '../../models/SignatureScreenDetail';

@Component({
	selector: 'signature',
	templateUrl: './signature.component.html'
})


export class SignatureComponent {

	public rd: RD;


	public canSendMessage: Boolean;
	private isRegistered: Boolean;
	private isSignatureCaptureStarted: Boolean;
	public signature: string;
	public uniqueStampForSignatureRequest: string;

	private forname: string;
	private surname: string;


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

	public saveSignature() {
		if (this.canSendMessage && this.isSignatureCaptureStarted) {
			var rdSig = new RDSignature(this.rd.RDUserName, this.rd.SignalRClientId, this.rd.StaticClientGuid, this.signature, this.uniqueStampForSignatureRequest);
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
					this.isSignatureCaptureStarted = false;
					this.signature = '';
					this.forname = '';
					this.surname = '';
					this.signaturePad.clearSignature();
				} else {
					this.signature = 'error!';
				}
			});
		})


		this._signalRService.startSignatureCaptureMessage.subscribe((message: SignatureScreenDetail) => {
			this._ngZone.run(() => {
				this.isSignatureCaptureStarted = true;
				this.forname = message.Forename;
				this.surname = message.Surname;
				this.uniqueStampForSignatureRequest = message.UniqueStamp;
			});
		})
	}

}

