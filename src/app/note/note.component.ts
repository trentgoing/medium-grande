import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../services/notes.service'
import { Note } from '../types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Input() index: number;
  @Output() editMade = new EventEmitter();
  editing: boolean = false;

  constructor(private noteService: NotesService) { }

  ngOnInit() {
  }
  
  /*
    Click handler for when the note becomes editable 
  */
  showEdit(): void {
    this.editing = true;
  }

  /*
    Click handler for when a note being edtied is saved.
    THis makes use of the note service to persist that value
  */
  saveNote(): void {
    this.noteService.editNote(this.note.paragraphId, this.index, this.note);
    this.editMade.emit();
    this.editing = false;
  }

  /*
    Click handler for when a note being edtied is deleted.
    THis also makes use of the note service to persist the removal.
  */
  deleteNote(): void {
    this.noteService.deleteNote(this.note.paragraphId, this.index);
    this.editMade.emit();
  }

}
