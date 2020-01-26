import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { MarginComponent } from './margin/margin.component';
import { NoteInputComponent } from './note-input/note-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    MarginComponent,
    NoteInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
