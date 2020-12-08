import { createSelector } from "@ngrx/store";
import { Board, boardState } from './boards.reducer';

export const selectBoards = createSelector(
  (state: boardState) => ({
      boards: state.boards,
      loading: state.loading,
      current: state.current,
    }),
  (state: boardState) => state.boards,
);
