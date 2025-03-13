import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  addMessage,
  addMessageSuccess,
  addMessageFailure,
} from './messages.actions';

@Injectable()
export class MessageEffects {
  private actions$ = inject(Actions);
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMessage),
      mergeMap(async ({ message }) => {
        try {
          const messagesRef = collection(this.firestore, 'messages');
          await addDoc(messagesRef, message);
          this.snackBar.open('Message sent successfully!', 'Close', {
            duration: 3000,
          });
          return addMessageSuccess();
        } catch (error: any) {
          this.snackBar.open('Failed to send message.', 'Close', {
            duration: 3000,
          });
          return addMessageFailure({ error: error.message });
        }
      })
    )
  );
}
