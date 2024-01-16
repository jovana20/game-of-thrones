import { FavoriteBook } from '../models/FavoriteBook.model';

export interface State {
  readonly favorites: Array<FavoriteBook>;
}