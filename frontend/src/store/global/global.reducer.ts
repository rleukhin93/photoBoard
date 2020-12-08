import { createReducer, on, ActionType } from '@ngrx/store';
import { loadingAction, setMessage, } from './global.actions';

export type globalState = {
    loading?: boolean,
    message?: string,
};
export const initialState: globalState = {
    loading: false,
    message: '',
};

const globalReducer = createReducer(
    initialState,
    on(loadingAction, (state: globalState, {loading}) => {
        console.log('tttttt333', state);
        return {...state, loading};
    }),
    on(setMessage, (state: globalState, {message}) => {
        console.log('dfdfdfdf', message);
        return {
            ...state,
            message,
        };
    }),
);

export function GlobalReducer(state?: globalState, action?: ActionType<any>): any {
    return globalReducer(state, action);
}
