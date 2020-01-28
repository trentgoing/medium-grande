import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article: string;
  paragraphs: Array<string>;
  constructor(private noteService: NotesService) { }

  /*
    Function to retrieve the article content.  If requesting from server
    or if additional articles were incorporated, this would be where it
    goes
  */
  getArticle(): string {
    return `Lorem ipsum dolor sit amet, adipiscing elit. Aenean dictum elementum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut porta venenatis velit, ac scelerisque nisi lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pellentesque elementum dolor vel aliquam. Integer maximus mattis nisi non efficitur. Nam elementum venenatis nibh sed feugiat. Aliquam a diam sed nulla lobortis sollicitudin ac vel lorem.
    Duis eu dui id sem dapibus sodales egestas et arcu. Aenean convallis nunc eu risus bibendum efficitur. Aenean congue sapien a tortor aliquam rhoncus. Nulla blandit suscipit justo, ac tincidunt mauris pharetra in. Phasellus congue congue convallis. Nullam feugiat nisl vel gravida rutrum. Vestibulum id quam gravida, gravida mauris id, bibendum nulla. Fusce vitae felis malesuada, mattis sem a, mattis risus.
    Aenean mollis, leo et consectetur tincidunt neque porttitor sapien, luctus auctor magna mi vel ante. suscipit tortor sed leo tincidunt egestas. Integer eu dui dapibus, lacinia purus quis, tempor sem. Morbi in malesuada justo. Morbi et neque tincidunt, consectetur lacus nec, ornare velit. Ut sit amet laoreet massa. Sed a erat risus. Aenean vulputate diam augue, non egestas velit tristique id. Suspendisse potenti.
    Praesent sollicitudin, quam nec tempor molestie, elit vehicula quam, fringilla fermentum massa nulla eu elit. Nullam nec egestas arcu, ac maximus odio. Integer ac vulputate libero. In ac dui eget felis laoreet placerat. Morbi dapibus turpis at enim ultricies, eget venenatis risus elementum. Cras molestie arcu eget magna tristique, nec tristique tellus venenatis. Praesent at scelerisque velit. Cras nec est magna. Vivamus vitae porta dolor. Vivamus felis dui, tincidunt ac nisl non, suscipit luctus metus.
    Nullam viverra ante nunc, eget ullamcorper lacus fringilla vel. Nam non dui ex. Vivamus nunc lacus, mollis eget lectus in, finibus molestie tellus. Etiam interdum libero enim, pretium laoreet mauris volutpat vel. Ut ornare ultrices velit, a rutrum odio blandit non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pharetra odio ut nulla aliquam sagittis. Quisque nisl orci, fringilla et tellus ut, ornare vehicula nulla. Quisque condimentum et massa ut aliquam. Integer vestibulum tellus sed dui vehicula,
    eu elementum elit varius. Aenean libero dolor, vulputate quis vitae, laoreet sit amet felis. Pellentesque sit amet laoreet sem, sit amet scelerisque arcu. Praesent pulvinar mauris a finibus porttitor. Aenean sodales convallis mi, quis tincidunt ante consequat.`
  }

  /*
    In order to render out notes aligned to a given paragraph, separate 
    the article's paragraphs to be rendered and managed individually
  */
  getParagraphs(): Array<string> {
    this.paragraphs = this.interpolateHighlights(this.getArticle().split("\n"));
    return this.paragraphs;
  }

  /*
    This function is what injects the highlights into the article text, 
    while maintaining the structure and content of the article itself.
    The notes are logged by character index on the text, so for a given 
    paragraph, all start and end indexes for notes are aggregated, 
    and then injected in their character index order.
  */
  interpolateHighlights(paragraphs: Array<string>): Array<string> {
    return paragraphs.map((paragraph, index) => {
      let charArray: Array<string> = paragraph.split('');
      let markTagsToInsert: Array<[number, string]> = [];
      if (this.noteService.notes && this.noteService.notes[index]) {
        this.noteService.notes[index].forEach(note => {
          markTagsToInsert.push([note.startCharacter, '<mark>'])
          markTagsToInsert.push([note.endCharacter, '</mark>'])
        });
        markTagsToInsert.sort(this.markTagSort);
        // let offset: number = 0;
        markTagsToInsert.forEach((tagArray, index)=> {
          charArray.splice((tagArray[0]+index), 0, tagArray[1]);
        })
        return charArray.join('');
      } else {
        return paragraph;
      }
    });
  }

  /*
    Utility sort to order highlighting tags in case one highlight is 
    nested within another.
  */
  markTagSort(a: [number, string], b: [number, string]): number {
    if (a[0] < b[0]) {
      return -1; 
    } else { 
      return 1;
    }
  }
}
