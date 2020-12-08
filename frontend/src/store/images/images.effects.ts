import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { loadPhotos, setPhotos, setTags, editPhoto } from './images.actions';
import { setCurrentBoard, setCurrentBoardAction, setBoards } from '../boards/boards.actions';
import { BoardPhotosService } from '../../app/services/board-photos.service';
import { Photo } from './images.reducer';
import { environment } from '../../environments/environment';

@Injectable()
export class PhotoEffects {
    constructor(
        private actions$: Actions,
        private boardPhotosService: BoardPhotosService,
    ) {}

    _setCurrentBoard = createEffect(() =>
        this.actions$.pipe(
            ofType(setCurrentBoard),
            mergeMap((payload) => this.boardPhotosService.getPhotosList(payload._id).pipe(
                map( (photos: Photo[]) => {
                    const photoApiList: Photo[] = [];
                    photos.map(photo => {
                        const newPhoto = {
                          src: '',
                          path: '',
                          tags: [],
                          _id: '',
                          board: '',
                          url: '',
                        };
                        newPhoto.path = photo.path || '';
                        newPhoto.url = photo.url || '';
                        newPhoto._id = photo._id || '';
                        newPhoto.tags = photo.tags || '';
                        newPhoto.board = photo.board || '';
                        newPhoto.src = `${environment.schema}${environment.backend}board/${newPhoto.board}/photos/${photo._id}`;
                        photoApiList.push(newPhoto);
                      });
                    return setPhotos({photos: photoApiList});
                }),
                catchError(error => of(error.subscribe((err: string) => console.log(err))))
            ))
        )
    );
    _setTags = createEffect(() =>
        this.actions$.pipe(
                ofType(setTags),
                mergeMap((payload) => this.boardPhotosService.taggingApi(payload.photosUrl).pipe(
                    map( (tags: any) => {
                        const newImgs: Photo[] = payload.prev.slice();
                        tags.map((el: any) => {
                            payload.prev.map((res, i) => {
                              const newImg: Photo = Object.assign({}, res);
                              if (res.url === el.value.image) {
                                newImg.tags = el.value.tags.tags;
                                newImgs[i] = newImg;
                              }
                            });
                        });
                        return setPhotos({photos: newImgs});
                    }),
                    // catchError(error => of(error.subscribe((err: string) => console.log(err))))
                )
            )
        )
    );
    _editPhoto = createEffect(() =>
        this.actions$.pipe(
                ofType(editPhoto),
                mergeMap((payload) => this.boardPhotosService.editPhoto(payload.photo).pipe(
                    map( (newImagesApi: any) => {
                        const photoApiList: Photo[] = [];
                        newImagesApi.map((photo: Photo) => {
                            const newPhoto = {
                              src: '',
                              path: '',
                              tags: [],
                              _id: '',
                              board: '',
                              url: '',
                            };
                            const indexSearch = payload.prev.findIndex(find => find._id === photo._id);
                            const myPhoto = payload.prev[indexSearch];
                            newPhoto.path = myPhoto.path || '';
                            newPhoto.url = myPhoto.url || '';
                            newPhoto._id = photo._id || '';
                            newPhoto.tags = photo.tags || '';
                            newPhoto.board = photo.board || '';
                            newPhoto.src = `${environment.schema}${environment.backend}board/${newPhoto.board}/photos/${photo._id}`;
                            photoApiList.push(newPhoto);
                          });
                        return setPhotos({photos: photoApiList});
                    }),
                    // catchError(error => of(error.subscribe((err: string) => console.log(err))))
                )
            )
        )
    );
}
