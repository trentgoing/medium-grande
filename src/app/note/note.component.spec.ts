import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { NoteInputComponent } from '../note-input/note-input.component';
import { Note } from '../types/note';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppRoutingModule
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    const note: Note = new Note("test note", 0, 0, 5, 0, []);
    component.note = note;
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
