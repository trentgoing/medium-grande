import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteInputComponent } from './note-input.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { TextSnippet } from '../types/textSnippet';

describe('NoteInputComponent', () => {
  let component: NoteInputComponent;
  let fixture: ComponentFixture<NoteInputComponent>;

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
    fixture = TestBed.createComponent(NoteInputComponent);
    component = fixture.componentInstance;
    const selection: TextSnippet = {
      content: 'test',
      paragraphId:0,
      startCharacter: 0,
      endCharacter: 5,
      mouse: [100, 100]
    }
    component.selection = selection;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
