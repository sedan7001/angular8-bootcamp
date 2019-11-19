import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TrendComponent } from './trend/trend.component';


const routes: Routes = [
	{ path: 'main', component: MainComponent },
	{ path: 'trend', component: TrendComponent },
	{ path: '', redirectTo: 'main', pathMatch: 'full' },
	{ path: '**', component: MainComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
