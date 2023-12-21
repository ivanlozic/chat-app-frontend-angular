import { createAction, props } from '@ngrx/store';
import { User } from '../shared/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User | null }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
export const updateUserData = createAction(
  '[Auth] Update User Data',
  props<{ user: User }>()
);
export const logout = createAction('[Auth] Logout');
