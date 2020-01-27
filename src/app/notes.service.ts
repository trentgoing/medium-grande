import { Injectable } from '@angular/core';
import { Note } from './types/note';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: object;

  constructor(private authService: AuthService) { 
    this.getNotes();
  }

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

  editNote(paragraphId: number, index: number, note: Note): void {
    if (this.authService.userInfo && note.userId === this.authService.userInfo.id){
      this.notes[paragraphId][index] = note;
      window.localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }

  deleteNote(paragraphId: number, index: number): void {
    if (this.authService.userInfo) {
      this.notes[paragraphId].splice(index, 1);
      window.localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }

  noteSort(a: Note, b: Note): number {
    if (a.startCharacter < b.startCharacter) {
      return -1; 
    } else { 
      return 1;
    }
  }

}