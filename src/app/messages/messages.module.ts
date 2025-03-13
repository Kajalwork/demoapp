import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { messageReducer } from './messages.reducer';
import { MessageEffects } from './messages.effects';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MessagesListComponent, // ✅ Import standalone component
    StoreModule.forFeature('messages', messageReducer),
    EffectsModule.forFeature([MessageEffects])
  ]
})
export class MessagesModule {}
