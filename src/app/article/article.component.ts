import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: String[];
  @Input() selected: TextSnippet;
  @Output() selectionMade = new EventEmitter<TextSnippet>();

  constructor(private articleService: ArticleService) {};

  ngOnInit() {
    this.article = this.articleService.getParagraphs();
  }

  /*
    If a user selects text content, then the app should register the
     selection and allow a note to be entered.  The selections are managed 
     across both article and note-input components by beinghoused in the
     Home component.  This function updates that variable based on selections.
  */
  clickHandler(event): void {
    if (window.getSelection) {
      let selection = window.getSelection();
      if (selection.toString().length > 0) {
        let indexOfLastMarker: number = selection.anchorNode.parentNode.textContent.indexOf(selection.anchorNode.textContent)
        if (selection.anchorNode === selection.focusNode) { // Check to see if it's in 1 paragraph, as Medium does
          // Update the "selected" field to indicate a possible note.  This should update to provide a button
          this.selected = {
            content: selection.toString(),
            paragraphId: event.srcElement.className,
            startCharacter: selection.anchorOffset > selection.focusOffset ? selection.focusOffset + indexOfLastMarker : selection.anchorOffset + indexOfLastMarker,
            endCharacter: selection.anchorOffset < selection.focusOffset ? selection.focusOffset + indexOfLastMarker : selection.anchorOffset + indexOfLastMarker,
            mouse: [event.clientX, event.clientY]
          }
        }
      } else {
        this.selected = new TextSnippet(
          null,
          null,
          null,
          null,
          null
        )
      }
      this.selectionMade.emit(this.selected);
    }
  }

}
