import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';
import { ArticleService } from '../article.service';

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
            endCharacter: selection.anchorOffset < selection.focusOffset ? selection.focusOffset + indexOfLastMarker : selection.anchorOffset + indexOfLastMarker
          }
        }
      } else {
        this.selected = {
          content: null,
          paragraphId: null,
          startCharacter: null,
          endCharacter: null
        }
      }
      this.selectionMade.emit(this.selected);
    }
  }

}
