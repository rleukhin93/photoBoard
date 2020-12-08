import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';
import { setCurrentBoardAction, setCurrentBoard, loadBoards, addNewBoard, deleteBoard, setBoards } from './boards.actions';
import { BoardService } from '../../app/services/board.service';
import { Board } from './boards.reducer';

@Injectable()
export class BoardEffects {
_loadBoards = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBoards),
            mergeMap(() => this.boardService.getBoards().pipe(
                // map( (boards: Board[]) => console.log(boards)),
                map( (boards: Board[]) => {
                    return setBoards({boards});
                    console.log('boards555', boards);
                    return {type: 'Set Boards List'};
                }),
                catchError(error => of(error.subscribe((err: string) => console.log(err))))
            )
        )
    )
  );

_createBoard = createEffect(() =>
    this.actions$.pipe(
            ofType(addNewBoard),
            mergeMap((payload) => this.boardService.createBoard(payload).pipe(
                map( (boards: Board[]) => setBoards({boards})),
                catchError(error => of(error.subscribe((err: string) => console.log(err))))
            )
        )
    )
);

_deleteBoards = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBoard),
            mergeMap(payload => this.boardService.deleteBoard(payload).pipe(
                map( (boards: Board[]) => setBoards({boards})),
                catchError(error => of(error.subscribe((err: string) => console.log(err))))
            )
        )
    )
);

// _setCurrentBoardAction = createEffect(() =>
//         this.actions$.pipe(
//             ofType(setCurrentBoardAction),
//             mergeMap((payload) => this.boardService.getBoards().pipe(
//                 // map( (boards: Board[]) => console.log(boards)),
//                 // tap( (boards: Board[]) => {
//                 //     setCurrentBoard(boards[0]); console.log('r!!!!', payload); return payload
//                 // }), // setBoards({boards})),
//                 map( (boards: Board[]) => {
//                     console.log('r!!!!', setCurrentBoard);
//                     setCurrentBoard(boards[0]);
//                     return {type: 'Set current board'};
//                 }), // setBoards({boards})),
//                 catchError(error => of(error.subscribe((err: string) => console.log('tyytytyty', err))))
//             )
//         )
//     )
// );

  constructor(
    private actions$: Actions,
    private boardService: BoardService
  ) {}
}