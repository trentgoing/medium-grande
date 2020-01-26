import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../types/note';
import { TextSnippet } from '../types/textSnippet';

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css']
})
export class NoteInputComponent implements OnInit {
  @Input() selection: TextSnippet;
  @Output() selectionMade = new EventEmitter<TextSnippet>();
  noteMessage: string = '';
  
  
  constructor() { }

  ngOnInit() {
  }

  submitNote() {
    let currentSelection = this.selection 

    // Add to notes list
    let note = new Note(
      this.noteMessage, 
      currentSelection.paragraphId, 
      currentSelection.startCharacter, 
      currentSelection.endCharacter, 
      0,
      []);

    console.log('Submit new data: ', JSON.stringify(note));
    // Then clear the selection
    let selected: TextSnippet = new TextSnippet(
      null,
      null,
      null,
      null
    )
    this.selectionMade.emit(selected);
  }

}
