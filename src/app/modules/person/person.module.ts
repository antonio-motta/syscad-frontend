import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';

import { 
  PersonListComponent, 
  PersonEditComponent, 
  PersonDetailsComponent, 
  PersonComponent
} from './components';

import { SharedModule } from '../shared';

import { PersonService} from './services';
import { MAT_DATE_LOCALE } from '@angular/material/core';
  
@NgModule({
  declarations: [
    PersonListComponent, 
    PersonEditComponent, 
    PersonDetailsComponent, 
    PersonComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    SharedModule
  ],
  providers: [
    PersonService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class PersonModule { }