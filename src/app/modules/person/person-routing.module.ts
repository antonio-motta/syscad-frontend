import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonComponent, PersonListComponent, PersonEditComponent } from './components';

export const PersonRoutes: Routes = [
	{ 
		path: 'person', 
		component: PersonComponent,
		children: [
			{ path: '', component: PersonListComponent },
			{ path: 'edit', component: PersonEditComponent },
			{ path: 'details', component: PersonEditComponent }
		]
	}
];

@NgModule({
    imports: [ RouterModule.forChild(PersonRoutes) ],
    exports: [ RouterModule ]
  })
export class PersonRoutingModule {
}
  