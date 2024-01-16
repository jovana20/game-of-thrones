import { createAction, props } from '@ngrx/store';
import { FavoriteBook } from '../models/FavoriteBook.model';

export const addToFavorites = createAction(
  '[Book List] Add to Favorites',
  props<{favoriteBook:FavoriteBook}>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove from Favorites',
  props<{ favoriteBook:FavoriteBook}>()
);
