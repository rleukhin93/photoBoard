import { createAction, props } from '@ngrx/store';
import { Board } from './boards.reducer';
import { Image } from './boards.reducer';

export const loadBoards = createAction('load Boards');
export const setBoards = createAction('Set Boards List', props<{boards: Board[]}>());
export const addNewBoard = createAction('Add new board', props<Board>());
export const setCurrentBoardAction = createAction('Set Current Board Action');
export const setCurrentBoard = createAction('Set current board', props<Board>());
// export const setCurrentBoard = createAction('Set current board', props<{boards: Board[]}>());
export const deleteBoard = createAction('Delete board', props<Board>());

// export const setBoardImages = createAction('Set Board Images', props<{images: Image[]}>());
// export const setBoardImages = createAction('Set Board Images', props<Image>());
export const setBoardImages = createAction('Set Board Images', props<Board>());
