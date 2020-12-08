import { createSelector } from "@ngrx/store";
import { Photo, PhotoState } from './images.reducer';

export const selectBoards = createSelector(
  (state: PhotoState) => ({
      photos: state.photos,
      loading: state.loading
    }),
  (state: PhotoState) => state.photos,
);
