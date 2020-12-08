import { createReducer, on, ActionType } from '@ngrx/store';
import { loadPhotos, setPhotos, setTags, editPhoto } from './images.actions';

export type Photo = {
    path?: string,
    board: string,
    tags?: any,
    _id?: string,
    src?: string,
    url?: string,
};
export type PhotoState = {
    photos: Photo[],
    loading: boolean,
};
export type RequestPhotoAdd = {
    url: string,
    tags: any[],
};
export const initialState: PhotoState = {
    photos: [],
    loading: false
};

const photoReducer = createReducer(
    initialState,
    on(loadPhotos, (state: PhotoState) => {
        return {...state, loading: true};
    }),
    on(setPhotos, (state: PhotoState, {photos}) => {
        return {
            photos,
            loading: false,
        };
    }),
    on(setTags, (state: PhotoState) => {
        return {
            ...state,
        };
    }),
    on(editPhoto, (state: PhotoState) => {
        return {
            ...state,
        };
    }),
);

export function PhotoReducer(state?: PhotoState, action?: ActionType<any>): any {
  return photoReducer(state, action);
}
