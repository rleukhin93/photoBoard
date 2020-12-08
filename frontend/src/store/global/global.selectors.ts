import { createSelector } from '@ngrx/store';
import { globalState } from './global.reducer';

export const selectBoards = createSelector(
  (state: globalState) => ({
      message: state.message,
      loading: state.loading
    }),
  (state: globalState) => state.loading,
);
