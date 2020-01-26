import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSnippet } from '../types/textSnippet';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent implements OnInit {
  @Input() selection: TextSnippet;
  @Output() selectionMade = new EventEmitter<TextSnippet>();
  
  constructor() { }

  ngOnInit() {
  }

  onMarginSelected(event):void {
    this.selectionMade.emit(event);
  }

}
