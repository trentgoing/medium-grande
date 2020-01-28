import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';
import { NotesService } from '../services/notes.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent implements OnInit {
  @Input() selection: TextSnippet;
  notes: object;
  
  constructor(private noteService: NotesService,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.getNotes();
  }

  /*
    Handles event from individual notes when updates are made
    and refreshes the notes list as well as highlights on text. 
  */
  getNotes(): void {
    this.notes = this.noteService.getNotes();
    this.articleService.getParagraphs();
  }

  /*
    Notes have been saved according to which paragraph the text 
    to which they correspond appears in.  Get the list of paragraphs 
    for iterating over here, used in the template.
  */
  get paragraphs(): Array<string> {
    return Object.keys(this.notes)
  }
  
  /*
    The below function positions notes within the margin so that 
    they are aligned with their corrosponding paragraph as close
    as possible.  
    First, the spacing is measured to the top of the paragraph
    Second, if too many notes already exist, additional space is added
    in order to prevent overlap.
  */
  top(paragraph: string): number {
    if (paragraph === "0") {
      return 0;
    }
    let currentParagraphTop: number = document.getElementById('paragraph-' + paragraph).offsetTop;
    let originalParagraphTop: number = document.getElementById('paragraph-0').offsetTop;
    let previousParagraphNotesTop: number = document.getElementById('paragraph-notes-' + (parseInt(paragraph) - 1)).offsetTop;
    let previousParagraphNotesHeight: number = document.getElementById('paragraph-notes-' + (parseInt(paragraph) - 1)) ? document.getElementById('paragraph-notes-' + (parseInt(paragraph) - 1)).offsetHeight : 0;
    let previousBottom: number = previousParagraphNotesTop + previousParagraphNotesHeight;
    let idealPosition: number =  currentParagraphTop - originalParagraphTop;
    if (previousBottom > idealPosition) {
      return previousBottom;
    } 
    return idealPosition;
  }
}
