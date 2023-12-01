import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  loggedIn: boolean;
  error: string | null;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const initialState: AuthState = {
  loggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, error: null })),
  on(AuthActions.loginSuccess, (state) => ({ ...state, loggedIn: true })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loggedIn: false,
  }))
);
