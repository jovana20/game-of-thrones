import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {

  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'https://anapioficeandfire.com/api/'; // Replace with your API base URL


  getBooks() {
    return this.http.get('https://anapioficeandfire.com/api/books');
  }

  // getBook(url: string) {
  //   return this.http.get(url);
  // }


  getBook(id: string): Observable<any> {
    return this.http.get(id);
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(id);
  }

  getBooksCharacterDetails(bookUrl: string): Observable<any> {
    return this.getBook(bookUrl).pipe(
      switchMap(book => {
        const characterRequests = book?.povCharacters.map((charUrl: string) => this.getCharacter(charUrl));
        return forkJoin(characterRequests).pipe(
          map(characters => ({ book, characters }))
        );
      })
    );
  }
}
