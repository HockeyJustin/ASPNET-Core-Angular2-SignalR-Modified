import { Component } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    public message: string;

    constructor() {
        this.message = 'Hello from HomeComponent constructor';
    }
}
