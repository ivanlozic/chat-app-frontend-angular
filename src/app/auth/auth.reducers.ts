import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../shared/models/user.model';

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  error: string | null;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.updateUserData, (state, { user }) => ({ ...state, user })),
  on(AuthActions.login, (state) => ({ ...state, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loggedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loggedIn: false,
  }))
);
