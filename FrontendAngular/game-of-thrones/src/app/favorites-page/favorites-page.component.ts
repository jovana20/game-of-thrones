import { Component, OnInit } from '@angular/core';
import { IceAndFireService } from '../services/ice-and-fire.service';
import { Observable } from 'rxjs';
import { selectFavorites } from '../store/selector/selector';
import { Store } from '@ngrx/store';
import { FavoriteBook } from '../store/models/FavoriteBook.model';
import { State } from '../store/models/state.model';



@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit{
  favoriteBooks: any[] = [];
  favorites$: Observable<FavoriteBook[]> | undefined;


  constructor(private gotBooksService: IceAndFireService, private store: Store<State>) { }

  ngOnInit() {
    this.store.select(selectFavorites).subscribe(favorites => {
      this.favoriteBooks = favorites;
    });
    

  }

  removeFromFavorites(book: any) {
      const favoriteBook: FavoriteBook = {
        id: book.id,
        name: book.name,
        author: book.author
      }
      this.gotBooksService.manageFavorites(favoriteBook)
    }
  
}
