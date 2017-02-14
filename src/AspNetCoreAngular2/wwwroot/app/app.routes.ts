import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { SignaturePageComponent } from './components/signaturepage/signaturepage.component';

const appRoutes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'signaturepage', component: SignaturePageComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/signaturepage', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });