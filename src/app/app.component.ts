import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import { NotesService } from './services/notes.service';

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
    this.articleService.getParagraphs();
  }
  
}
