import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ListBoardComponent } from './components/list-board/list-board.component';
import { BoardComponent } from './components/board/board.component';
import { GlobalReducer, globalState } from '../store/global/global.reducer';
import { BoardReducer, boardState } from '../store/boards/boards.reducer';
import { PhotoReducer, PhotoState } from '../store/images/images.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from '../store/boards/boards.effects';
import { PhotoEffects } from '../store/images/images.effects';
import { globalEffects } from '../store/global/global.effects';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './components/list-board/modal/modal.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { FooterComponent } from './components/footer/footer.component';

export interface AppState {
  boardState: boardState;
  photoState: PhotoState;
  globalState: globalState;
  photos?: any;
}
@NgModule({
  declarations: [
    AppComponent,
    ListBoardComponent,
    BoardComponent,
    ModalComponent,
    ImageListComponent,
    FooterComponent,
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    SharedModule,
    EffectsModule.forRoot([BoardEffects, PhotoEffects, globalEffects]),
    StoreModule.forRoot({
      boardState: BoardReducer,
      photoState: PhotoReducer,
      globalReducer: GlobalReducer,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
