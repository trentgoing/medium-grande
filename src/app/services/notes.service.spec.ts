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
import { AuthService } from './auth.service';
import { Note } from '../types/note';

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

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });

  it('should initialize localstorage with notes info if logged in', () => {
    const fake =  { userInfo: {"id":0,"email":"test","username":"test","password":"test"}};
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    expect(window.localStorage.getItem('notes-0')).not.toEqual(null);
    expect(window.localStorage.getItem('notes-0')).toEqual("{}");
  });

  it('should initialize service variable with notes info if not logged in', () => {
    const fake =  { userInfo: null };
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    expect(window.localStorage.getItem('notes-0')).toEqual(null);
  });

  it('should add a note if logged in', () => {
    const fake =  { userInfo: {"id":0,"email":"test","username":"test","password":"test"}};
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    const testNote: Note = {message:"abitant m", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 0, tags:[]}
    notesService.addNote(testNote);
    expect(notesService.notes[0].length).toEqual(1);
    expect(window.localStorage.getItem('notes-0')).not.toEqual(null);
  });

  it('should not add a note if not logged in', () => {
    const fake =  { userInfo: null };
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    const testNote: Note = {message:"abitant m", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 0, tags:[]}
    notesService.addNote(testNote);
    expect(notesService.notes).toEqual({});
    expect(window.localStorage.getItem('notes-0')).toEqual(null);
  });

  it('should not add a note for a wrong user', () => {
    const fake =  { userInfo: {"id":0,"email":"test","username":"test","password":"test"} };
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    const testNote: Note = {message:"abitant m", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 2, tags:[]}
    notesService.addNote(testNote);
    expect(notesService.notes).toEqual({});
    expect(window.localStorage.getItem('notes-0')).toEqual("{}");
  });

  it('should edit note for valid user', () => {
    const fake =  { userInfo: {"id":0,"email":"test","username":"test","password":"test"} };
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    const testNote: Note = {message:"abitant m", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 0, tags:[]}
    notesService.addNote(testNote);
    expect(notesService.notes[0][0].message).toEqual("abitant m");
    const newNote: Note = {message:"NEW NOTE", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 0, tags:[]}
    notesService.editNote(newNote.paragraphId, 0, newNote);
    expect(notesService.notes[0][0].message).toEqual("NEW NOTE");
  });

  it('should delete note for valid user', () => {
    const fake =  { userInfo: {"id":0,"email":"test","username":"test","password":"test"} };
    let notesService = new NotesService(fake as AuthService);
    expect(notesService.notes).toEqual({});
    const testNote: Note = {message:"abitant m", paragraphId: 0, startCharacter: 262, endCharacter: 271, userId: 0, tags:[]}
    notesService.addNote(testNote);
    expect(notesService.notes[0][0].message).toEqual("abitant m");
    notesService.deleteNote(0, 0);
    expect(notesService.notes[0].length).toEqual(0);
  });

});
