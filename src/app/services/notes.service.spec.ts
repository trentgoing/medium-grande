import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { AppRoutingModule } from '../app-routing.module';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { NoteInputComponent } from '../note-input/note-input.component';
import { FormsModule } from '@angular/forms';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AppRoutingModule,
      FormsModule
    ],
    declarations: [
      NoteComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent,
      ChangePasswordComponent,
      ArticleComponent,
      MarginComponent,
      NoteInputComponent,
    ]
  }));

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });
});
