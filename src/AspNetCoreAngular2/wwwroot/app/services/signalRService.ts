import { Injectable, EventEmitter } from '@angular/core';
import { CONFIGURATION } from '../shared/app.constants';
import { ChatMessage } from '../models/ChatMessage';
import { RD } from '../models/RD';
import { RDSignature } from '../models/RDSignature';

declare var $: any;

@Injectable()
export class SignalRService {

    private proxy: any;
    private proxyName: string = 'coolmessages';
	private connection: any;
	public connectionId: string;

    public foodchanged: EventEmitter<any>;

	public messageReceived: EventEmitter<ChatMessage>;

	public successFailMessage: EventEmitter<string>;
	public startSignatureCaptureMessage: EventEmitter<string>;
	public saveSignatureSuccessOrFailMessage: EventEmitter<string>;

    public newCpuValue: EventEmitter<Number>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;

    constructor() {
        this.foodchanged = new EventEmitter();
        this.connectionEstablished = new EventEmitter<Boolean>();

		this.messageReceived = new EventEmitter<ChatMessage>();

		this.successFailMessage = new EventEmitter<string>();
		this.startSignatureCaptureMessage = new EventEmitter<string>();
		this.saveSignatureSuccessOrFailMessage = new EventEmitter<string>();

		this.newCpuValue = new EventEmitter<Number>();
        this.connectionExists = false;

        this.connection = $.hubConnection(CONFIGURATION.baseUrls.server + 'signalr/');
        this.proxy = this.connection.createHubProxy(this.proxyName);

        this.registerOnServerEvents();

        this.startConnection();
    }

	// UPDATE: Inlucde connectionId in message.
    public sendChatMessage(message: ChatMessage) {
		this.proxy.invoke('SendMessage', this.connectionId,  message);
	}


	// New
	public sendRegistrationId(rd: RD) {
		rd.SignalRClientId = this.connectionId;
		this.proxy.invoke('SendRegistrationId', rd);
	}

	// New
	public saveSignature(rdSignautre: RDSignature)
	{
		rdSignautre.SignalRClientId = this.connectionId;
		this.proxy.invoke('SaveSignature', rdSignautre);
	}




    private startConnection(): void {
        this.connection.start().done((data: any) => {
			console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
			this.connectionId = data.id;
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }

    private registerOnServerEvents(): void {
        this.proxy.on('FoodAdded', (data: any) => {
            this.foodchanged.emit(data);
        });

        this.proxy.on('FoodDeleted', (data: any) => {
            this.foodchanged.emit('this could be data');
        });

        this.proxy.on('FoodUpdated', (data: any) => {
            this.foodchanged.emit('this could be data');
        });

        this.proxy.on('SendMessage', (data: ChatMessage) => {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            this.messageReceived.emit(data);
		});

		// NEW!!!!
		this.proxy.on('RegistrationSuccessOrFail', (data: string) => {
			console.log('received in SignalRService: ' + JSON.stringify(data));
			this.successFailMessage.emit(data);
		});

		// New!!!
		this.proxy.on('StartSignatureCapture', (data: string) => {
			console.log('received in SignalRService: ' + JSON.stringify(data));
			this.startSignatureCaptureMessage.emit(data);
		})

		// New!!!
		this.proxy.on('SaveSignatureSuccessOrFail', (data: string) => {
			console.log('received in SignalRService: ' + JSON.stringify(data));
			this.saveSignatureSuccessOrFailMessage.emit(data);
		});


        this.proxy.on('newCpuValue', (data: number) => {
            this.newCpuValue.emit(data);
        });
    }
}
