import { createAction, props } from '@ngrx/store';

export const addMessage : any= createAction(
  '[Message] Add Message',
  props<{ message: { email: string; message: string } }>()
);

export const addMessageSuccess = createAction(
  '[Message] Add Message Success'
);

export const addMessageFailure = createAction(
  '[Message] Add Message Failure',
  props<{ error: string }>()
);
