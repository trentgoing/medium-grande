import { Component } from '@angular/core';
import { TextSnippet } from './types/textSnippet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vfi-fe-challenge';
  selection: TextSnippet;
  
  constructor() {
    this.selection = {content: null,paragraphId: null, startCharacter: null, endCharacter: null}
  }

  onSelected(selectionMade: TextSnippet) {
    this.selection = selectionMade;
  }
}
