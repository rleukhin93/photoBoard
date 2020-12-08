import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { loadingAction, setMessage } from './global.actions';
import { BoardPhotosService } from '../../app/services/board-photos.service';
import { globalState } from './global.reducer';
// import { Board, boardState } from '../boards/boards.reducer';

@Injectable()
export class globalEffects {
    constructor(
        private actions$: Actions,
        private boardPhotosService: BoardPhotosService
    ) {}

    // _setCurrentBoard = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(setCurrentBoard),
    //         mergeMap((payload) => this.boardPhotosService.getPhotosList(payload._id).pipe(
    //         // mergeMap((payload) => this.boardPhotosService.getPhotos().pipe(
    //             map( (photos: Photo[]) => {
    //                 console.log('photos!!!', photos);
    //                 // setPhotos({photos});
    //                 // return {type: 'setPhotos'};
    //                 return setPhotos({photos});
    //                 return payload.type;
    //             }),
    //             // map( (photos: Photo[]) => console.log(photos)),
    //             catchError(error => of(error.subscribe((err: string) => console.log(err))))
    //         ))
    //     )
    // );
    // _setCurrentBoard = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(setCurrentBoard),
    //         mergeMap((payload) => this.boardPhotosService.getPhotosList(payload).pipe(
    //         // mergeMap((payload) => this.boardPhotosService.getPhotos().pipe(
    //             map( (photos: Photo[]) => { console.log('photos!!!', photos); setPhotos({photos}); }),
    //             // map( (photos: Photo[]) => console.log(photos)),
    //             catchError(error => of(error.subscribe((err: string) => console.log(err))))
    //         ))
    //     )
    // );

// _createBoard = createEffect(() =>
//     this.actions$.pipe(
//             ofType(addNewBoard),
//             mergeMap((payload) => this.boardPhotosService.createBoard(payload).pipe(
//                 map( (boards: Board[]) => setBoards({boards})),
//                 catchError(error => of(error.subscribe((err: string) => console.log(err))))
//             )
//         )
//     )
// );

// _deleteBoards = createEffect(() =>
//         this.actions$.pipe(
//             ofType(deleteBoard),
//             mergeMap(payload => this.boardPhotosService.deleteBoard(payload).pipe(
//                 map( (boards: Board[]) => setBoards({boards})),
//                 catchError(error => of(error.subscribe((err: string) => console.log(err))))
//             )
//         )
//     )
// );
}
