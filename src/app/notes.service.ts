import { Injectable } from '@angular/core';
import { Note } from './types/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: object;

  constructor() { }

  getNotes(): object {
    let local: string = window.localStorage.getItem('notes');
    if (local === null) {
      // notes has never been defined, and we can set to empty
      window.localStorage.setItem('notes', JSON.stringify({}));
      this.notes = {};
      return this.notes;
    }
    this.notes = JSON.parse(local);
    return this.notes;
  }

  addNote(note: Note):void {
    if (this.notes[note.paragraphId]) {
      this.notes[note.paragraphId].push(note);
      this.notes[note.paragraphId].sort(this.noteSort) 
    } else {
      this.notes[note.paragraphId] = [note];
    }
    window.localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  noteSort(a: Note, b: Note): number {
    if (a.startCharacter < b.startCharacter) {
      return -1; 
    } else { 
      return 1;
    }
  }

}