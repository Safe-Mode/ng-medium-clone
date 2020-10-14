import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: 'register',
  component: RegisterComponent
}];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [RegisterComponent]
})
export class AuthModule {
}
