import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskedInputDirective } from './directives';

@NgModule({
  declarations: [ MaskedInputDirective ],
  imports: [
    CommonModule
  ],
  exports: [ MaskedInputDirective ]
})
export class SharedModule { }
