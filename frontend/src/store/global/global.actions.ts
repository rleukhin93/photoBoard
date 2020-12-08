import { createAction, props } from '@ngrx/store';
import { globalState } from './global.reducer';

const loadingAction = createAction('SET_LOADING', props<globalState>());
const setMessage = createAction('SET_MESSAGE', props<globalState>());

export {
    loadingAction,
    setMessage,
};
// export const addNewBoard = createAction('Add new board', props<Board>());
// export const setCurrentBoard = createAction('Set current board', props<Board>());
// export const deleteBoard = createAction('Delete board', props<Board>());
