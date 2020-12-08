import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from 'src/store/boards/boards.reducer';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCurrentBoard } from '../../store/boards/boards.actions';
import { AppState } from '../app.module';
import { map } from 'rxjs/operators';
import { Photo, RequestPhotoAdd } from '../../store/images/images.reducer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardPhotosService {
  boards$: Observable<Board[]>;
  currentBoard: Board | undefined;
  newImages = new BehaviorSubject<Photo[]>([]);

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.boards$ = this.store.select(state => state.boardState.boards);
    this.currentBoard = undefined;
  }

  getPhotos2(id: string): Observable<any> {
    return this.http.get(`${environment.schema}${environment.backend}board/${id}/photos/`);
  }
  getPhotosList(id: string | undefined): Observable<any> {
    return this.http.get(`${environment.schema}${environment.backend}board/${id}/photos/`);
  }
  addPhotos(): Observable<any> {
    const files: Photo[] = this.newImages.value;
    const id = this.currentBoard?._id || undefined;
    const myFiles: RequestPhotoAdd[] = [];
    files.map(file => {
      const myFile = {
        url: file.path || '',
        tags: file.tags || [],
      };
      myFiles.push(myFile);
    });
    return this.http.post(`${environment.schema}${environment.backend}board/${id}/photos/`, myFiles);
    // const myPromises1level: Promise<any>[] = [];
    // const myPromises2level: Promise<any>[] = [];
    // files.map(file => {
    //   myPromises1level.push(fetch(file.path || ''));
    // });
    // Promise.all(myPromises1level).then((resps) => {
    //   resps.map(res => {
    //     myPromises2level.push(res.blob());
    //   });
    //   Promise.all(myPromises2level).then(responses => {
    //     responses.map(blob => {
    //       const newFile = new File([blob], 'file');
    //       myFiles.push(newFile);
    //     });
    //     const bodyFormData = new FormData();
    //     // bodyFormData.append('photos', myFiles);
    //     myFiles.forEach(file => {
    //       bodyFormData.append('photos', file);
    //     });
    //     this.http.post(`${environment.schema}${environment.backend}board/${id}/photos/`, bodyFormData)
    //     .subscribe(res => {
    //     });
    //   });
    // });
    // const myImage = new File(files[0].path);
    // const myImage = new Image();
    // myImage.src = files[0].path || '';
    // return this.http.post(`${environment.schema}${environment.backend}board/${id}/photos/`, { photos: [files] });
  }
  switchCurrentBoard(id: string): void {
    this.boards$.pipe(
        map( boards => boards.find( board => board._id === id))
    ).subscribe( (board)  => {
      this.store.dispatch(setCurrentBoard(<Board> board));
      this.currentBoard = board;
    }).unsubscribe();
  }
  getCurrentBoardState(): Board | object {
    return this.currentBoard || {};
  }
  addPhoto(url: string): void {
    const newImgs = this.newImages.value;
    const newImg: Photo = {
      path: url,
      board: this.currentBoard?._id || '',
    };
    newImgs.push(newImg);
    this.newImages.next(newImgs);
  }
  dispatchNewPhotos(photos: Photo[]): void {
    this.newImages.next(photos);
  }
  addPhotoTags(tags: any[], url: string): void {
    const newImgs: Photo[] = this.newImages.value;
    this.newImages.value.map((res, i) => {
      const newImg: Photo = res;
      if (res.path === url) {
        newImg.tags = tags;
        newImgs[i] = newImg;
      }
    });
    this.newImages.next(newImgs);
  }
  getNewPhotos(): Observable<Photo[]> {
    return this.newImages.asObservable();
  }
  clearAddedFiles() {
    this.newImages.next([]);
  }
  getLoadingObservable(): Observable<boolean> {
    return of(false);
  }
  getProksiImg(url: string): string {
    const proksiUrl = `${environment.schema}${environment.backend}get-image?q=${url}`;
    return proksiUrl;
  }
  taggingNewImages(): Observable<any> {
    const myUrls: string[] = [];
    this.newImages.value.map(api => {
      myUrls.push(api.path || '');
    });
    const id = this.currentBoard?._id || undefined;
    return this.http.post(`${environment.schema}${environment.backend}board/${id}/photos/tagging`, myUrls);
  }

  taggingApi(photoApiList: string[]): Observable<any> {
    let allUrls: string[] = [];
    const myUrls: string[] = [];
    this.newImages.value.map(api => {
      myUrls.push(api.path || '');
    });
    const id = this.currentBoard?._id || undefined;
    allUrls = [...myUrls, ...photoApiList];
    return this.http.post(`${environment.schema}${environment.backend}board/${id}/photos/tagging`, allUrls);
  }
  editPhoto(photo: Photo): Observable<any> {
    const id = this.currentBoard?._id || undefined;
    return this.http.put(`${environment.schema}${environment.backend}board/${id}/photos/${photo._id}`, photo);
  }
}
