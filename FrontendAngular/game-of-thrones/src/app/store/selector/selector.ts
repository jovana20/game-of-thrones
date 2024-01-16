import { createSelector } from '@ngrx/store';
import { State } from '../models/state.model';
import { FavoriteBook } from '../models/FavoriteBook.model';

export const selectFavorites = createSelector(
    (state: State) => state.favorites,
    (favorites: FavoriteBook[]) => favorites
  );
  
