import { createReducer, on } from '@ngrx/store';
import { addMessage, addMessageFailure, addMessageSuccess } from './messages.actions';

export interface MessageState {
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  loading: false,
  error: null
};

export const messageReducer = createReducer(
  initialState,
  on(addMessage, state => ({ ...state, loading: true, error: null })),
  on(addMessageSuccess, state => ({ ...state, loading: false })),
  on(addMessageFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
