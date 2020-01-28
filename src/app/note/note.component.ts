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

  showEdit(): void {
    this.editing = true;
  }

  saveNote(): void {
    this.noteService.editNote(this.note.paragraphId, this.index, this.note);
    this.editMade.emit();
    this.editing = false;
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note.paragraphId, this.index);
    this.editMade.emit();
  }

}
