import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogoComponent } from '../../components/logo/logo.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    LogoComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule {
}
