import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Board, boardState } from 'src/store/boards/boards.reducer';
import { select, Store } from '@ngrx/store';
import { setTags } from '../../../store/images/images.actions';
import { loadingAction } from '../../../store/global/global.actions';
import { loadBoards, addNewBoard, deleteBoard, setCurrentBoardAction } from '../../../store/boards/boards.actions';
import { AppState } from '../../app.module';
import { filter, first, map, take } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent as CreateModalComponent } from './modal/modal.component';
import { BoardPhotosService } from '../../services/board-photos.service';
import { Photo, PhotoState } from 'src/store/images/images.reducer';
import { globalState } from 'src/store/global/global.reducer';

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.scss']
})
export class ListBoardComponent implements OnInit {
  boards$: Observable<Board[]>;
  currentBoard$: Observable<Board | undefined>;
  currentBoard: Board | undefined;
  photoApiList: Photo[];
  photos$: Observable<Photo[]>;
  loading$: Observable<boolean | undefined>;
  photos: string;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public boardPhotosService: BoardPhotosService,
  ) {
    this.photos = '';
    this.photos$ = this.store.select(state => state.photoState.photos);
    this.boards$ = this.store.select(state => state.boardState.boards);
    this.currentBoard$ = this.store.select(state => state.boardState.current);
    this.loading$ = this.store.select(state => state.globalState.loading);
    this.photoApiList = [];
  }

  createBoard() {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      data: <Board>{name: ''}
    });

    dialogRef.afterClosed().subscribe( (result: Board | undefined) => {
      if (result) {
        this.store.dispatch(addNewBoard(result));
      }
    });
  }

  deleteBoard() {
    this.store.dispatch(deleteBoard({_id: '1', name: '111'}));
  }

  selectBoard(event: Event ) {
    this.boardPhotosService.switchCurrentBoard(event.toString());
  }
  addPhoto(): any {
    const files = this.photos;
    this.photos = '';
    this.boardPhotosService.addPhoto(files);
  }
  taggingApi(): any {
    const myUrls: string[] = [];
    this.photoApiList.map(api => {
      myUrls.push(api.url || '');
    });
    this.store.dispatch(setTags({photosUrl: myUrls, prev: this.photoApiList}));
    this.boardPhotosService.taggingNewImages().subscribe(tags => {
      tags.map((el: any) => {
        this.boardPhotosService.addPhotoTags(el.value.tags.tags, el.value.image);
      });
    });
  }
  checkApiImgs(): void {
    this.photos$.subscribe( (photos)  => {
      this.photoApiList = photos;
    });
  }
  ngOnInit(): void {
    this.currentBoard$.subscribe(x => {
      this.currentBoard = x;
      this.boardPhotosService.dispatchNewPhotos([]);
    });
    this.checkApiImgs();
  }
}
