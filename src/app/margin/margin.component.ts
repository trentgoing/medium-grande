import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';
import { NotesService } from '../notes.service';
import { Note } from '../types/note';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent implements OnInit {
  @Input() selection: TextSnippet;
  @Output() selectionMade = new EventEmitter<TextSnippet>();
  notes: Array<Note>;
  
  constructor(private noteService: NotesService) { }

  ngOnInit() {
    this.getNotes();
  }

  onMarginSelected(event):void {
    this.selectionMade.emit(event);
  }

  getNotes(): void {
    this.notes = this.noteService.getNotes();
  }
}
