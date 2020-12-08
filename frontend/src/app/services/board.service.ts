import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from 'src/store/boards/boards.reducer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient,
  ) {}

  getBoards() {
    return this.http.get(`${environment.schema}${environment.backend}board/`) as Observable<Board[]>;
  }
  createBoard(board: Board) {
    return this.http.post(`${environment.schema}${environment.backend}board/`, board) as Observable<Board[]>;
  }
  deleteBoard(board: Board) {
    return this.http.delete(`${environment.schema}${environment.backend}boards${board._id}`) as Observable<Board[]>;
  }
}
