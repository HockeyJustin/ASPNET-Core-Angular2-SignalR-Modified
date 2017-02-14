import { NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ChatComponent } from './components/chat/chat.component';
import { CpuComponent } from './components/cpu/cpu.component';
import { FoodComponent } from './components/food/food.component';
import { SignatureComponent } from './components/signature/signature.component';
import { SignaturePageComponent } from './components/signaturepage/signaturepage.component';
import { SignaturePadComponent } from './components/signature-pad/signaturepad.component';
import { SignalRService } from './services/signalRService';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
		FormsModule,
		SignaturePadModule
    ],

    declarations: [
        AppComponent,
        DashboardComponent,
        AboutComponent,        
        ChatComponent,
		CpuComponent,
		FoodComponent,
		SignatureComponent,
		SignaturePageComponent,
		SignaturePadComponent
    ],


    providers: [
        SignalRService
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }