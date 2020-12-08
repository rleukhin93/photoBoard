import { Component, OnInit } from '@angular/core';
import { BoardPhotosService } from '../../services/board-photos.service';
import { select, Store } from '@ngrx/store';
import { loadBoards, setCurrentBoard } from '../../../store/boards/boards.actions';
import { editPhoto } from '../../../store/images/images.actions';
import { AppState } from '../../app.module';
import { from, Observable, of } from 'rxjs';
import { Photo, PhotoState } from 'src/store/images/images.reducer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  photos$: Observable<Photo[]>;
  photoList: Photo[];

  constructor(
    public boardPhotosService: BoardPhotosService,
    private store: Store<AppState>,
  ) {
    this.photos$ = this.store.select(state => state.photoState.photos);
    this.photoList = [];
  }

  ngOnInit(): void {
    this.photos$.subscribe(photos => {
      this.photoList = photos;
    });
  }
  dismissChanges() {
    this.boardPhotosService.clearAddedFiles();
  }
  addPhotos(): any {
    this.boardPhotosService.addPhotos()
    .subscribe(x => console.log('addPhotos res =', x));
    this.photoList.map(myPhoto => {
      if (myPhoto.tags) {
        this.store.dispatch(editPhoto({photo: myPhoto, prev: this.photoList}));
      }
    });
  }
}
