import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [CommonModule, AvatarModule, ButtonModule, InputTextModule],
  exports: [AvatarModule, ButtonModule, InputTextModule],
})
export class PrimeModule {}
