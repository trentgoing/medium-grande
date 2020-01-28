import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { TextSnippet } from '../types/textSnippet';
import { Note } from '../types/note';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.css']
})
export class NoteInputComponent implements OnInit {
  @Input() selection: TextSnippet;
  @Output() selectionMade = new EventEmitter<TextSnippet>();
  noteMessage: string = '';
  
  constructor(private noteService: NotesService,
              private authService: AuthService,
              private articleService: ArticleService) { }

  ngOnInit() {
  }

  /* 
    Upon clicking the submit button, the current selection is paired 
    with the values in the note input form, and sent to the note 
    service, before selections are cleared.
  */
  submitNote() {
    let currentSelection = this.selection 
    // check user's authentication
    if (this.authService.userInfo !== null) {
      // Add to notes via note service
      let note = new Note(
        this.noteMessage, 
        currentSelection.paragraphId, 
        currentSelection.startCharacter, 
        currentSelection.endCharacter, 
        this.authService.userInfo.id,
        []);
      this.noteService.addNote(note);
      
      // update paragraphs with new highlights
      this.articleService.getParagraphs();

      // Then clear the selection
      let selected: TextSnippet = new TextSnippet(
        null,
        null,
        null,
        null,
        null
      )
      this.selectionMade.emit(selected);
    } else {
      // If unauthenticated, then display error
      this.authService.errorMessage = "You must login to create notes!";
      setTimeout(() => {
        this.authService.errorMessage = null;
      }, 3000);
    }
  }

}
