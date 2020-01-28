import { Injectable } from '@angular/core';
import { Note } from '../types/note';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: object;

  constructor(private authService: AuthService) { 
    this.getNotes();
  }

  /*
    Notes are stored in the variable named within this service. However, they are persisted
    in local storage.  This function either initializes or retrieves the notes from local 
    storage and sets the variable.
  */
  getNotes(): object {
    if (this.authService.userInfo !== null) {
      let local: string = window.localStorage.getItem(`notes-${this.authService.userInfo.id}`);
      if (local === null) {
        // notes has never been defined, and we can set to empty
        window.localStorage.setItem('notes', JSON.stringify({}));
        this.notes = {};
        return this.notes;
      }
      this.notes = JSON.parse(local);
    } else {
      this.notes = {}
    }
    return this.notes;
  }

  /*
    Function to add note.  It is both added to the local variable, and updated in local storage.
    User login information is confirmed before allowing addition.
  */
  addNote(note: Note): void {
    if (this.authService.userInfo !== null) {
      if (this.notes[note.paragraphId]) {
        this.notes[note.paragraphId].push(note);
        this.notes[note.paragraphId].sort(this.noteSort) 
      } else {
        this.notes[note.paragraphId] = [note];
      }
      window.localStorage.setItem(`notes-${this.authService.userInfo.id}`, JSON.stringify(this.notes));
    }
  }

  /*
    Function to edit note.  The note is found by paragraph and index.
    User login information is confirmed before allowing addition.
    It is both updated in the local variable and local storage.
  */
  editNote(paragraphId: number, index: number, note: Note): void {
    if (this.authService.userInfo && note.userId === this.authService.userInfo.id){
      this.notes[paragraphId][index] = note;
      window.localStorage.setItem(`notes-${this.authService.userInfo.id}`, JSON.stringify(this.notes));
    }
  }

  /*
    Function to delete note.  The note is found by paragraph and index.
    User login information is confirmed before allowing addition.
    It is both removed from the local variable and local storage.
  */
  deleteNote(paragraphId: number, index: number): void {
    if (this.authService.userInfo) {
      this.notes[paragraphId].splice(index, 1);
      window.localStorage.setItem(`notes-${this.authService.userInfo.id}`, JSON.stringify(this.notes));
    }
  }

  /*
    Helper function for the addition of a note.  In order to 
    have notes appear in order of their corrosponding text,
    this arranges them according to the start character.
  */  
  noteSort(a: Note, b: Note): number {
    if (a.startCharacter < b.startCharacter) {
      return -1; 
    } else { 
      return 1;
    }
  }

}