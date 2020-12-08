import { createReducer, on, ActionType } from '@ngrx/store';
import { loadBoards, setBoards, setCurrentBoard, addNewBoard, deleteBoard, setBoardImages, setCurrentBoardAction } from './boards.actions';

export type Image = {
    _id?: string,
    src?: string,
    tags?: string,
};

export type Board = {
    _id?: string,
    name: string,
};
export type boardState = {
    boards: Board[],
    loading: boolean,
    current?: Board,
};
export const initialState: boardState = {
    boards: [
        {
            _id: 'id1',
            name: 'name1',
        },
        {
            _id: 'id2',
            name: 'name2',
        }
    ],
    loading: false
};

const boardReducer = createReducer(
    initialState,
    on(loadBoards, (state: boardState) => {
        return {...state, loading: true};
    }),
    on(setBoards, (state: boardState, {boards}) => {
        return {
            boards,
            loading: false,
        }
    }),
    on(setCurrentBoardAction, (state: boardState) => {
        return {
            ...state,
        };
    }),
    on(setCurrentBoard, (state: boardState, board) => {
        return {
            ...state,
            current: {
                _id: board._id,
                name: board.name
            }
        }
    }),
    on(addNewBoard, (state: boardState) => {
        return {...state, loading: true }
    }),
    on(deleteBoard, (state: boardState) => {
      return {...state, loading: true }
    }),
    on(setBoardImages, (state: boardState, board) => {
        return {
            ...state,
            current: board,
        };
    }),
    // on(setBoardImages, (state: boardState, images) => {
    //     return {
    //         ...state,
    //         current: {
    //             ...state.current,
    //             images,
    //         },
    //     }
    // }),
);
 
export function BoardReducer(state?: boardState, action?: ActionType<any>) {
  return boardReducer(state, action);
}