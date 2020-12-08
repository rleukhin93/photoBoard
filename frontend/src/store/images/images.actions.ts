import { createAction, props } from '@ngrx/store';
import { Photo } from './images.reducer';

const loadPhotos = createAction('LOAD_PHOTOS');
const setPhotos = createAction('SET_PHOTOS', props<{photos: Photo[]}>());
const setTags = createAction('SET_TAGS', props<{photosUrl: string[], prev: Photo[]}>());
const editPhoto = createAction('EDIT_PHOTO', props<{photo: Photo, prev: Photo[]}>());

export {
    loadPhotos,
    setPhotos,
    setTags,
    editPhoto,
};
