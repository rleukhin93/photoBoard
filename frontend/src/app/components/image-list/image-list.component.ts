import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Board, boardState } from 'src/store/boards/boards.reducer';
import { select, Store } from '@ngrx/store';
import { loadBoards, setCurrentBoard } from '../../../store/boards/boards.actions';
import { AppState } from '../../app.module';
import { BoardPhotosService } from '../../services/board-photos.service';
import { Photo, PhotoState } from 'src/store/images/images.reducer';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  photos$: Observable<Photo[]>;
  loading$: Observable<boolean>;
  currentBoard$: Observable<Board | undefined>;
  photoList: Photo[];
  photoApiList: Photo[];
  currentBoard: Board | undefined;

  constructor(
    private store: Store<AppState>,
    private boardPhotosService: BoardPhotosService,
  ) {
    this.loading$ = this.store.select(state => state.boardState.loading);
    this.currentBoard$ = this.store.select(state => state.boardState.current);
    this.photos$ = this.store.select(state => state.photoState.photos);
    this.photoList = [];
    this.photoApiList = [];
    this.currentBoard = undefined;
  }

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
    this.currentBoard$.subscribe(current => {
      this.getPhotos(current?._id || '');
      this.currentBoard = current;
    });
    this.getPhotosApi();
  }

  getPhotos(id: string): any {
    this.boardPhotosService.getNewPhotos().subscribe(x => {
      this.photoList = x || [];
    });
  }
  getPhotosApi() {
    this.photos$.subscribe( (photos)  => {
      this.photoApiList = photos;
    });
  }

}
