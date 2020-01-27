import { Component, OnInit } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selection: TextSnippet;

  constructor() { }

  ngOnInit() {
    this.selection = {content: null,paragraphId: null, startCharacter: null, endCharacter: null, mouse: null}
  }

  onSelected(selectionMade: TextSnippet) {
    this.selection = selectionMade;
  }

}
