import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { NoteInputComponent } from '../note-input/note-input.component';
import { NotesService } from './notes.service';

describe('ArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AppRoutingModule,
      FormsModule
    ],
    declarations: [
      NoteComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent,
      ChangePasswordComponent,
      ArticleComponent,
      MarginComponent,
      NoteInputComponent,
    ]
  }));

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });

  it('should retrieve the article', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    service.getArticle();
    expect(service.getArticle()).toEqual(`Lorem ipsum dolor sit amet, adipiscing elit. Aenean dictum elementum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut porta venenatis velit, ac scelerisque nisi lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pellentesque elementum dolor vel aliquam. Integer maximus mattis nisi non efficitur. Nam elementum venenatis nibh sed feugiat. Aliquam a diam sed nulla lobortis sollicitudin ac vel lorem.
    Duis eu dui id sem dapibus sodales egestas et arcu. Aenean convallis nunc eu risus bibendum efficitur. Aenean congue sapien a tortor aliquam rhoncus. Nulla blandit suscipit justo, ac tincidunt mauris pharetra in. Phasellus congue congue convallis. Nullam feugiat nisl vel gravida rutrum. Vestibulum id quam gravida, gravida mauris id, bibendum nulla. Fusce vitae felis malesuada, mattis sem a, mattis risus.
    Aenean mollis, leo et consectetur tincidunt neque porttitor sapien, luctus auctor magna mi vel ante. suscipit tortor sed leo tincidunt egestas. Integer eu dui dapibus, lacinia purus quis, tempor sem. Morbi in malesuada justo. Morbi et neque tincidunt, consectetur lacus nec, ornare velit. Ut sit amet laoreet massa. Sed a erat risus. Aenean vulputate diam augue, non egestas velit tristique id. Suspendisse potenti.
    Praesent sollicitudin, quam nec tempor molestie, elit vehicula quam, fringilla fermentum massa nulla eu elit. Nullam nec egestas arcu, ac maximus odio. Integer ac vulputate libero. In ac dui eget felis laoreet placerat. Morbi dapibus turpis at enim ultricies, eget venenatis risus elementum. Cras molestie arcu eget magna tristique, nec tristique tellus venenatis. Praesent at scelerisque velit. Cras nec est magna. Vivamus vitae porta dolor. Vivamus felis dui, tincidunt ac nisl non, suscipit luctus metus.
    Nullam viverra ante nunc, eget ullamcorper lacus fringilla vel. Nam non dui ex. Vivamus nunc lacus, mollis eget lectus in, finibus molestie tellus. Etiam interdum libero enim, pretium laoreet mauris volutpat vel. Ut ornare ultrices velit, a rutrum odio blandit non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pharetra odio ut nulla aliquam sagittis. Quisque nisl orci, fringilla et tellus ut, ornare vehicula nulla. Quisque condimentum et massa ut aliquam. Integer vestibulum tellus sed dui vehicula,
    eu elementum elit varius. Aenean libero dolor, vulputate quis vitae, laoreet sit amet felis. Pellentesque sit amet laoreet sem, sit amet scelerisque arcu. Praesent pulvinar mauris a finibus porttitor. Aenean sodales convallis mi, quis tincidunt ante consequat.`)
  });

  it('should parse the article into multiple paragraphs', ()=> {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service.getParagraphs().length).toEqual(6);
  })

  it('should save the paragraphs within the service', ()=> {
    const service: ArticleService = TestBed.get(ArticleService);
    service.getParagraphs()
    expect(service.paragraphs).toEqual(service.getParagraphs());
  })

  it('should be able to interpolate notes within a paragraph', ()=> {
    const fake =  { notes: {"0":[{"message":"abitant m","paragraphId":"0","startCharacter":262,"endCharacter":271,"userId":1,"tags":[]},{"message":"t netus et ","paragraphId":"0","startCharacter":296,"endCharacter":307,"userId":1,"tags":[]},{"message":". Nam eleme","paragraphId":"0","startCharacter":428,"endCharacter":439,"userId":1,"tags":[]},{"message":"solli","paragraphId":"0","startCharacter":506,"endCharacter":511,"userId":1,"tags":[]}],"1":[{"message":"la blandit s","paragraphId":"1","startCharacter":157,"endCharacter":169,"userId":1,"tags":[]},{"message":"ttis sem a, m","paragraphId":"1","startCharacter":386,"endCharacter":399,"userId":1,"tags":[]}],"2":[{"message":" laoreet","paragraphId":"2","startCharacter":304,"endCharacter":312,"userId":1,"tags":[]}],"3":[{"message":"gilla fer","paragraphId":"3","startCharacter":77,"endCharacter":86,"userId":1,"tags":[]},{"message":"pis at enim","paragraphId":"3","startCharacter":241,"endCharacter":252,"userId":1,"tags":[]}],"4":[{"message":"ctus in, fi","paragraphId":"4","startCharacter":118,"endCharacter":129,"userId":1,"tags":[]},{"message":"erdum lib","paragraphId":"4","startCharacter":161,"endCharacter":170,"userId":1,"tags":[]}],"5":[{"message":"oreet sem, sit a","paragraphId":"5","startCharacter":121,"endCharacter":137,"userId":1,"tags":[]}]}};
    let articleService = new ArticleService(fake as NotesService);
    articleService.getParagraphs();
    expect(articleService.interpolateHighlights(articleService.paragraphs)[0].indexOf("<mark>")).toBeGreaterThanOrEqual(0);
  })

  it('should be able to sort notes', ()=> {
    const outputMarks = [[153,"<mark>"],[162,"</mark>"],[226,"<mark>"],[238,"</mark>"],[361,"<mark>"],[368,"</mark>"],[417,"<mark>"],[433,"</mark>"],[479,"<mark>"],[489,"</mark>"]];
    const inputMarks =  [[238,"</mark>"],[153,"<mark>"],[361,"<mark>"],[226,"<mark>"],[368,"</mark>"],[417,"<mark>"],[162,"</mark>"],[433,"</mark>"],[479,"<mark>"],[489,"</mark>"]];
    const service: ArticleService = TestBed.get(ArticleService);
    expect(inputMarks.sort(service.markTagSort)).toEqual(outputMarks);
  })
});
