import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from '../actions/books.actions';
import { FavoriteBook } from '../models/FavoriteBook.model';

export const initialState: FavoriteBook[] = [];

export const favoritesReducer = createReducer(
    initialState,
    on(FavoritesActions.addToFavorites, (state, { favoriteBook }) => [...state, favoriteBook]),
    on(FavoritesActions.removeFromFavorites, (state, { favoriteBook }) => 
      state.filter(book => book.id !== favoriteBook.id))
  );
