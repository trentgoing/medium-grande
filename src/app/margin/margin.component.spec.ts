import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginComponent } from './margin.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { NoteInputComponent } from '../note-input/note-input.component';

describe('MarginComponent', () => {
  let component: MarginComponent;
  let fixture: ComponentFixture<MarginComponent>;

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
    fixture = TestBed.createComponent(MarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
