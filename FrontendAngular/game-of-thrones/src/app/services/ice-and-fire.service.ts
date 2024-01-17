import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../store/selector/selector';
import { FavoriteBook } from '../store/models/FavoriteBook.model';
import * as FavoritesActions from '../store/actions/books.actions'



@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {

  constructor(private http: HttpClient, private store: Store<any>) {}


  getBooks() {
    return this.http.get('https://anapioficeandfire.com/api/books');
  }


  isInFavorites(url: string) {
    let isFavorite = false;
    this.store.select(selectFavorites).subscribe(favorites => {
      isFavorite = favorites.some(item => item.id === url);
    });

    return isFavorite;
  }

  getBook(id: string): Observable<any> {
    return this.http.get(id);
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(id);
  }

  getBooksCharacterDetails(bookUrl: string): Observable<any> {
    return this.getBook(bookUrl).pipe(
      switchMap(book => {
        if (!book?.povCharacters || book.povCharacters.length === 0) {
          return of({ book, characters: [] });
        }
          const characterRequests = book.povCharacters.map((charUrl: string) => this.getCharacter(charUrl));
        return forkJoin(characterRequests).pipe(
          map(characters => ({ book, characters }))
        );
      })
    );
  }


  manageFavorites(favoriteBook: FavoriteBook) {

    if(this.isInFavorites(favoriteBook.id)) {
      this.store.dispatch(FavoritesActions.removeFromFavorites({ favoriteBook }));

    } else {
      this.store.dispatch(FavoritesActions.addToFavorites({favoriteBook}));

    }
  }
}
