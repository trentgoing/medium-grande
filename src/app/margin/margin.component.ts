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
}
