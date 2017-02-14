import { Component, ViewChild, EventEmitter, Input, Output  } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
	selector: 'signaturepad',
	template: '<signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>'
})

export class SignaturePadComponent {



	@Output() onSignatureComplete = new EventEmitter<string>();
	private signatureLocal: string;

	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
		dotSize: 0.5,
		minWidth: 1,
		maxWidth: 2,
		canvasWidth: 500,
		canvasHeight: 300,
		penColor: 'blue',
	};

	constructor() {
		// no-op
	}


	ngAfterViewInit() {
		// this.signaturePad is now available
		//this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
		this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
	}

	clearSignature(): void{		
		this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
	}


	drawComplete() {

		//this.signatureLocal = this.signaturePad.toDataURL('image/jpeg', 0.5);
		this.signatureLocal = this.signaturePad.toDataURL();
		// will be notified of szimek/signature_pad's onEnd event
		//console.log(this.signaturePad.toDataURL());
		this.onSignatureComplete.emit(this.signatureLocal);
	}

	drawStart() {
		// will be notified of szimek/signature_pad's onBegin event
		console.log('begin drawing');
	}
}