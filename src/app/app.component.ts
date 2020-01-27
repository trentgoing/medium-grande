import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ArticleService } from './article.service';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vfi-fe-challenge';
  
  constructor(public authService: AuthService, 
              public articleService: ArticleService, 
              public noteService: NotesService) {}


  logoutClick() {
    this.authService.logout(); 
    this.noteService.getNotes();
    console.log(this.noteService.notes);
    this.articleService.getParagraphs();
  }
  
}
