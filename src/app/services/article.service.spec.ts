import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { NoteInputComponent } from '../note-input/note-input.component';

describe('ArticleService', () => {
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
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });
});
