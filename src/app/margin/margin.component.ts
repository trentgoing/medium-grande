import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';
import { NotesService } from '../notes.service';
import { ArticleService } from '../article.service';

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

  getNotes(): void {
    this.notes = this.noteService.getNotes();
    this.articleService.getParagraphs();
  }

  get paragraphs(): Array<string> {
    return Object.keys(this.notes)
  }
  
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
