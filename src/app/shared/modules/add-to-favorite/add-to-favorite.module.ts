import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AddToFavoriteService } from './services/add-to-favorite.service';
import { AddToFavoriteComponent } from './components/add-to-favorite/add-to-favorite.component';
import { ToggleIsFavoriteEffect } from './store/effects/toggle-is-favorite.effect';

@NgModule({
  declarations: [AddToFavoriteComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ToggleIsFavoriteEffect])
  ],
  exports: [AddToFavoriteComponent],
  providers: [AddToFavoriteService]
})
export class AddToFavoriteModule {
}
